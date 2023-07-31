const { Oc, Detalleoc } = require('../../db.js');
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
   let match=0;
   const algoresponde = await axios.get(urld, config).then(response => {
     console.log('Respuesta al TOKEN:', response.data,' data ');
     console.log('description:', response.data.description,'description  TOKEN ');
     console.log('status:', response.data.status,' status ');
     let descrip =  response.data.description;
     let statusfinal =  response.data.status;
     strsta = response.data.status_detail;
     const regex = /\((\d+)\)/;
     console.log('status_detail:',strsta ,' status_detail TOKEN ');
     match = descrip.match(regex);
     numeroparentesis = parseInt(match[1]);
     if (match && match[1]) {    
      console.log("Número entre paréntesis:", numeroparentesis);      
    // return (numberInParentheses);  

    } else {  console.log("No se encontró ningún número entre paréntesis."); }     
  
  }).catch(error => { console.error('Error al hacer la solicitud:', error);  });
     console.log("FIN", " OK");
       try {
        var orden = await Oc.findOne({
          where: { idoc: numeroparentesis }
        });
        if (orden) {
          await orden.update({ estadooc: strsta }); // Esperar a que se complete la actualización
        }
       } catch (error) {  console.error('Error al buscar o actualizar la orden:', error);
       }   
   }
   res.sendStatus(200);
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: error.message });
 }
}
module.exports = paymentNotif;