const { string } = require('joi');
const { Oc, Detalleoc, Libro } = require('../../db.js');
const mercadopago = require('mercadopago'); // Importa la configuración de Mercado Pago
const nodemailer = require('nodemailer');
const axios = require('axios');
require("dotenv").config();
const { MAILER_PASSWORD, URL_BACK, TOKEN_MP } = process.env;

// Configurar las opciones de envío de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'libreriaproyectofinal@gmail.com',
      pass: MAILER_PASSWORD,
  },
});

mercadopago.configure({ access_token: TOKEN_MP, });

const createPayment = async (req, res) => {
  try {
    // const { loginuserparam, idocparam } = req.body;    
    const loginuserparam = req.query.login;
    const idocparam = req.query.idoc;
    // Validar que los valores no sean indefinidos
    if (typeof loginuserparam === 'undefined' || typeof idocparam === 'undefined') {
      return res.status(400).json({  error: 'Los parámetros login e idoc son requeridos.'  });
    }
    //console.log('SI ENTRA AL PAYMENT: ', 'user:', loginuserparam,'idoc:', idocparam);

    const oc = await Oc.findOne({  where: { id: idocparam }, include: [Detalleoc]   });
    if (!oc) {  return res({  error: 'Orden compra NO encontrada' }
      ); } else {    console.log('ORDEN DE COMPRA SI ENCONTRADA: ', oc,'.');   } 

    const itemsx = await oc.getDetalleocs({include: [{model: Libro,
    as: 'libro',}]});

    if (!itemsx) {  return res.status(404).json({ error: 'Detalle de OC NO encontrada' });    }
  
  const largarray = itemsx.length;
  console.log('ITEMS: ', itemsx, '..');
  const itemsa =[];
  let detallestring = ' ';
  for (i=0; i < largarray ; i++){
    console.log( itemsx[i].dataValues);
    itemsa[i] =  itemsx[i].dataValues;
    detallestring = detallestring + ', ' + itemsx[i].dataValues.libro.nombrelibro;     
  }
    detallestring = detallestring + '.';
    const arrayObjt = [];

  for (i=0; i < largarray ; i++){
    arrayObjt.push( 
      {   
        title:       itemsx[i].dataValues.libro.nombrelibro,                                        
        unit_price:  itemsx[i].dataValues.libro.preciolibro,
        quantity:    itemsx[i].dataValues.libro.cantidad   
      }   
    ) 
  }

  console.log('Items : ', arrayObjt+'..');
   const preference = {
    items: [
      {
        title: "Detalle: "+detallestring+" ." + " OrdenId: ("+idocparam+") .-" ,
        unit_price:  oc.valortotaloc,
        currency_id: "ARS",
        quantity : 1  
     },
    ],
    "payer": {
    "email": loginuserparam ,
    "phone": {
    "area_code": "569-TROKTROK",
    "number": Number(idocparam)
    },
    "identification": {
    "type": "login",
    "number": "FANTASY-12345"
    },
    "address":  {
      "street_name": "Fantasy Street",
      "street_number": 123,
      "zip_code": "FANTASY-ZIP",
      "city": "Fantasy City",
      "state": "Fantasy State",
      "country": "Fantasy Country"
    }
  },
    "back_urls": {
    "success": URL_BACK+"/success", 
    "failure": URL_BACK+"/failure",
    "pending": URL_BACK+"/pending"
  },
    notification_url: URL_BACK+"/notifications",
  };
  /**AQUI CREO LA ORDEN COMPRA EN MERCADO PAGO INCRUSTANDO LOS ITEMS */
  const response = await mercadopago.preferences.create(preference);
  // Devolver la respuesta con la preferencia de pago generada
  console.log("Orden de compra creada!: ",response);
  res.json(response.body); 

  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: error.message });
  }  
};

module.exports = createPayment;