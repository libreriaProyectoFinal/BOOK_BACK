const { Oc, Detalleoc, conn } = require('../../db.js');
const axios = require('axios');

const paymentNotif = async (req, res) => {
 try {
   let numeroparentesis = 0;
   let strsta = "";
   console.log('entra al handlePaymentNotification ');
   const notificationData = req.body;
   console.log('Notificación recibida aFUERA:', notificationData, '....');

   if (notificationData.data != undefined && notificationData.action != undefined  && notificationData.user_id != undefined) {
   console.log('data id orden pago :', notificationData.data);
   console.log('id orden pago :', notificationData.data.id);
   console.log('action: ' + notificationData.action + '.');
   console.log('user_id: ' + notificationData.user_id + '.');
   
   const urld = "https://api.mercadopago.com/v1/payments/" + notificationData.data.id;
   const tokend = 'TEST-7245813158620870-072815-14435b04fc77bec4dcb8e07a5853d167-1434624699';
// Configuración de Axios con el token de portador
   const config = {
    headers: {
      'Authorization': `Bearer ${tokend}`
    }
   };
   let match = 0;
   let elCodigoOc = "";
   let statusfinal = "";
   const algoresponde = await axios.get(urld, config).then(response => {
     console.log('Respuesta al TOKEN:', response.data,' data ');
     console.log('description:', response.data.description,'description  TOKEN ');
     console.log('status:', response.data.status,' status ');
     let descrip =  response.data.description;
     statusfinal =  response.data.status;
     strsta = response.data.description;
     const regex = /\((.*?)\)/;
     console.log('status_detail: ',strsta ,' status_detail TOKEN ');
     const match = strsta.match(regex);
     
     if (match && match[1]) {    
      elCodigoOc = match[1];
      console.log("Número hex paréntesis:", match[1]);      
    // return (numberInParentheses);  

    } else {  console.log("No se encontró ningún paréntesis."); }     
  
  }).catch(error => { console.error('Error al hacer la solicitud:', error);  });  
    console.log("FIN", " OK -> a cambiar la oc." );
       try {
        var orden = await Oc.findOne({
          where: { id: elCodigoOc }
        });
        if (orden) {
          await orden.update({ estadooc: statusfinal }); 
        }
       } catch (error) { 
          console.error('Error al buscar o actualizar la orden:', error);
        }
   /** aqui debo de ir a buscar las cantidades de cada item tengo el idoc*/
   /**debo ir al detalle oc y traeme cada idlibro  */
     const query = "SELECT idlibro, cant,nombrelibro, idoc FROM detalleocs WHERE idoc = '"+elCodigoOc+"' ";
     let itemsOc = await conn.query(query);     

     console.log('resultado libros de la oc=  '+ elCodigoOc + ' es:  ', itemsOc,'  .');

   
      try {
        // Recorremos el array de objetos
        console.log('si entra itemsoc,' , itemsOc[0]);
        for (const libro of itemsOc[0]) {
          const { idlibro, cant } = libro;
          if (idlibro && cant !== undefined) {
           console.log('cant:',cant,'id:', idlibro ,'.')
            // Consulta para actualizar la columna 'dispLibro' en la tabla 'libro'
            // Reemplaza 'libro' por el nombre de tu tabla y 'dispLibro' por el nombre de tu columna de disponibilidad.
            const updateQuery = "UPDATE libros SET displibro = ( displibro - "+cant+" ) WHERE id = '"+idlibro+"'  ";
             let algo =  await conn.query(updateQuery, [cant, idlibro]);
             console.log('algo:',algo);
             }              
          
        }
          
        
       // res.send('Actualización exitosa');
      } catch (error) {
        console.error('Error al actualizar los libros:', error);
      //  res.status(500).send('Error al actualizar los libros');
      }
    

     /**pongo eso en un array y despues recorro el array , para ir libro por libro */



  

   }
   res.sendStatus(200);
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: error.message });
 }
}
module.exports = paymentNotif;