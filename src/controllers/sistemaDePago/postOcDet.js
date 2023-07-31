const { Oc, Detalleoc, Libro } = require('../../db.js');
const axios = require('axios');
const { getUsuarioPorEmail } = require('../usuario/get/getUsuarioPorEmail.js');

const dummy1 = { "loginuser":"felipebaranao31@yahoo.com", "idoc":2 };

const postOCyDetalle = async (req, res) => {
  const { loginuser, hashvalidacionpago, valortotaloc,estadooc, detalleocx } = req.body;
  console.log('req.body: ',req.body ,'..');
  try {
    const fechahoraocaux = new Date();
    const fechahoraoc = fechahoraocaux.toISOString();
    /**aqui creo la oc en la BD */
    const usuario = getUsuarioPorEmail(loginuser);

    if(!usuario){
      throw new Error("Usuario no existe")
    }

    const newOC = await Oc.create({  fechahoraoc, hashvalidacionpago, valortotaloc, estadooc });

    newOC.setUsuario(usuario);

    await newOC.save()

    // Obtener el idoc generado para la OC recién insertada
    const idoc = newOC.id;

    // Insertar en la tabla "detalleoc" por cada objeto en "detalleocx"
    for (let i = 0; i < detalleocx.length; i++) {
      const { idlibro, nombrelibro, valorunitario, cant, subtotal } = detalleocx[i];

      const libro = await Libro.findByPk(idlibro)
      if(!libro){
        throw new Error("Libro no existe")
      }
      const detail= await Detalleoc.create({ idoc, nombrelibro, valorunitario, cant, subtotal });
      detail.setLibro(libro);
      await detail.save()
    }
    
    console.log('newOC: ', newOC);
    console.log('idoc: ', newOC.id);

/** */
    const urlx = "http://localhost:3001/create-order?login="+loginuser+"&idoc="+idoc+"  ";
    try{  
    // let response = await axios.post(urlx, bodyx);       
    let response = await axios.post(urlx); /**create-order por axios */
    let URLPoint = "";
    let urlidoc = response.config.url ;
    console.log('Primera Response: ', { response }, '----');
    console.log('Response.config.url : ',  urlidoc , '----');
    URLPoint = response.data.init_point;

    let collectorId = response.data.collector_id;
     let aux = [];
     aux = response;
    /**collector_id: 1434624699, */
   // console.log("Segunda 2  : " + { aux }+ " -" );
    console.log('URLPoint: ', URLPoint);
    console.log("client_id: " + response.data.client_id + "-");
    console.log("collectorId: " + collectorId.toString());
    /**aqui debo hacer un update en oc en idoc*/
    const orden = await Oc.findOne({ where: { id: idoc } });
    if (orden) {
      await orden.update( 
                  {   urlpoint: URLPoint   },  );  
                        }
  algod =  { orden: "Porfavor pague en el link:",
              URLo: URLPoint  };
    console.log("FIN", " OK");
    return res.status(201).send( algod );   

    } catch (error) {
    console.error('Error en la solicitud POST: ', error);
    }  
  } catch (error) {  return res.status(500).send({ error: 'Error en consulta' });  }
};
module.exports =  postOCyDetalle ;


