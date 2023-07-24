const nodemailer = require('nodemailer');
require("dotenv").config();
const { MAILER_PASSWORD } = process.env;

async function respuestaEmailCreacionUsuario(email) {
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
    subject: '¡Bienvenido a Libreria Latam! Confirmación de registro exitoso.',
    text: '¡Gracias por unirte a Libreria Latam! Estamos encantados de que te hayas registrado y te damos la más cordial bienvenida a nuestra comunidad dedicada a venta de libros.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

module.exports = {
    respuestaEmailCreacionUsuario,
}
