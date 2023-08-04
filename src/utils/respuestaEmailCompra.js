const nodemailer = require('nodemailer');
const { htmlCompra } = require('./htmlCompra');
require("dotenv").config();
const { MAILER_PASSWORD } = process.env;

async function respuestaEmailCompra(email, pedido) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'libreriaproyectofinal@gmail.com',
      pass: MAILER_PASSWORD,
    },
  });

  const resumenPedido = await htmlCompra(pedido)

  const mailOptions = {
    from: 'libreriaproyectofinal@gmail.com',
    to: email,
    subject: '¡Gracias por comprar en Libreria Latam! Confirmación de pago exitoso.',
    text: '¡Gracias por comprar a Libreria Latam! Estamos encantados de prestarte ese servicio y en pronto te estaremos enviando su pedido.',
    html:resumenPedido,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

module.exports = {
    respuestaEmailCompra,
}
