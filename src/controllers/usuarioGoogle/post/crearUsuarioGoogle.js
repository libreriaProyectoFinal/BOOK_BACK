require("dotenv").config();

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const { OAuth2Client } = require('google-auth-library');

const { crearUsuario } = require('../../usuario/post/crearUsuario');

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);

async function crearUsuarioGoogle(idToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (payload) {
      // Extraer información del usuario desde el payload
      const usuarioId = payload.sub;
      const usuarioEmail = payload.email || "";
      const usuarioName = payload.name || "";

      const user = await postUser(
        usuarioName,
        "default", // -password
        usuarioEmail, 
        "default", // -nickname
        "default", // -picture
        "usuario"  // -rol
      );

      // creacion de usuario
      console.log('Nuevo usuario creado:');
      console.log(`ID: ${usuarioId}`);
      console.log(`Nombre: ${usuarioName}`);
      console.log(`Email: ${usuarioEmail}`);
    }
  } catch (error) {
    console.error("El usuario no fue creado por un error: ", error);
  }
}

module.exports = { crearUsuarioGoogle };