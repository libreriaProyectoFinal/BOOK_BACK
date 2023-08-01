const { string } = require('joi');
const { Usuario,  Oc, Detalleoc } = require('../../db.js');
const mercadopago = require('mercadopago'); // Importa la configuración de Mercado Pago
const nodemailer = require('nodemailer');
const axios = require('axios');
require("dotenv").config();
const { ACCESS_TOKEN, GOOGLE_TOKEN } = process.env;
//eURL    = "http://localhost:3001" ; 
backURL = "http://190.100.208.178:3001";
//backURL = "http://localhost:3001";

//eURL = "https://commerce-back-2025.up.railway.app" ;

// Configurar las opciones de envío de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'all.market.henry@gmail.com',
    pass: GOOGLE_TOKEN,
  },
});
mercadopago.configure({ access_token: "TEST-7245813158620870-072815-14435b04fc77bec4dcb8e07a5853d167-1434624699", });

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

   const itemsx = await Detalleoc.findAll({  where: { idoc: idocparam }   });
   if (!itemsx) {  return res.status(404).json({ error: 'Detalle de OC NO encontrada' });    }
   else {   console.log('Items OC SI encontrada');   }
   
   const oc = await Oc.findOne({  where: { id: idocparam }   });
   if (!oc) {  return res({  error: 'Orden compra NO encontrada' }
    );    }
   else {    console.log('ORDEN DE COMPRA SI ENCONTRADA: ', oc,'.');   }   

  const largarray = itemsx.length;
  console.log('ITEMS: ', itemsx, '..');
  const itemsa =[];
  let detallestring = ' ';
  for (i=0; i < largarray ; i++){
    console.log( itemsx[i].dataValues);
    itemsa[i] =  itemsx[i].dataValues;
    detallestring = detallestring + ', ' + itemsx[i].dataValues.nombrelibro;     
  }
    detallestring = detallestring + '.';
   const arrayObjt = [];

   for (i=0; i < largarray ; i++){
    arrayObjt.push( 
       {   
          title:       itemsx[i].dataValues.nombrelibro,                                        
          unit_price:  itemsx[i].dataValues.preciolibro,
          quantity:    itemsx[i].dataValues.cantidad   }   ) 
    }
  console.log('Items : ', arrayObjt+'..');
   const preference = {
    items: [
     {
      title: "Detalle: "+detallestring+" ." + " OrdenId: ("+idocparam+") .-" ,
      unit_price:  oc.valortotaloc,
      currency_id:"CLP",
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
     "success": backURL+"/success",
     "failure": backURL+"/failure",
     "pending": backURL+"/pending"
    },
    notification_url: backURL+"/notifications",
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
/** este no se usa  */
   
  module.exports =  createPayment ;