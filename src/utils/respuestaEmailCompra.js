const nodemailer = require('nodemailer');
require("dotenv").config();
const { MAILER_PASSWORD } = process.env;

async function respuestaEmailCompra(email, resumenPedido) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'libreriaproyectofinal@gmail.com',
      pass: MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'libreriaproyectofinal@gmail.com',
    to: email,
    subject: '¡Gracias por comprar en Libreria Latam! Confirmación de pago exitoso.',
    text: '¡Gracias por comprar a Libreria Latam! Estamos encantados de prestarte ese servicio y en pronto te estaremos enviando su pedido.',
    html: `
    <h1>¡Gracias por comprar en Libreria Latam!</h1>
    <p>Estamos encantados de prestarte ese servicio y en pronto te estaremos enviando tu pedido.</p>
    <p>Tu resumen de pedido:</p>
    <ul>
      <li>Producto 1: $20.00</li>
      <li>Producto 2: $30.00</li>
      <!-- Agrega aquí los detalles de los productos y el total del pedido -->
    </ul>
    <p>¡Gracias de nuevo por tu compra!</p>
    `,
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
