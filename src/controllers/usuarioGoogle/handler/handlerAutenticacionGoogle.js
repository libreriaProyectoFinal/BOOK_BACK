const { OAuth2Client } = require('google-auth-library');

const { postCrearUsuario } = require('../../usuario/post/crearUsuario');
const { generadorTokenDeAcceso } = require('../../../utils/generadorTokenDeAcceso');

const { getUsuarioGooglePorEmail } = require('../../usuarioGoogle/get/getUsuarioGooglePorEmail');


const admin = require('firebase-admin');
var serviceAccount = require("./libreriaproyectofinal-188c0-firebase-adminsdk-zmqxl-5c0d263dc8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Interfaz del usuario
// const Usuario = {
//   id: '',
//   name: '',
//   email: ''
// };

// Función para encontrar un usuario en mi base de datos
async function findUsuarioPorEmail(usuarioEmail) {
  try {
    const usuario = await getUsuarioGooglePorEmail(usuarioEmail);

    if (usuario) {
      // El usuario fue encontrado
      console.log(`Usuario encontrado: ${usuario}`);
      return usuario;
    } else {
      // El usuario no fue encontrado
      return null;
    }
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la búsqueda del usuario
    console.error('Error al buscar el usuario por correo electrónico: ', error);
    throw new Error('Error al buscar el usuario');
  }
}

async function handlerAutenticacionGoogle(req, res) {
  try {
    const { idToken } = req.body;
    console.log(idToken);

    const ticket =  await admin.auth().verifyIdToken(
      idToken);


    if (ticket) {
      const userId = ticket.uid;
      const userEmail = ticket.email || '';
      const userName = ticket.name || '';

      // Verificar si el usuario ya existe en mi base de datos
      const existeUsuario = await findUsuarioPorEmail(userEmail);
      // y si uso User.findOne({ email: userEmail });

      if (existeUsuario) {
        // El usuario ya existe
        // Pense en aplicar el TOKEN Aqui

        const token = await generadorTokenDeAcceso(existeUsuario.id, 'usuario');

        console.log("token :", token);

        // usuario autenticado
        res.status(200).json({ user: existeUsuario, accessToken: token });
        return;
      } else {
        // El usuario no existe, creao un nuevo usuario en tu base de datos o sistema
        const nuevoUsuario = await postCrearUsuario(
          userName,
          'default', // -password
          userEmail,
          'default', // -nickname
          'src/controllers/usuarioGoogle/handler/imagenDefaultGoogle.jpeg', // -picture
          'usuario'  // -rol
        );
        
        const token = await generadorTokenDeAcceso(nuevoUsuario.id, 'usuario');

        console.log(token);

        // usuario autenticado
        res.status(200).json({ user: nuevoUsuario, accessToken: token });
      }
      return;
    } else {
      res.status(400).json({ error: 'Token de ID inválido' });
      return;
    }
  } catch (error) {
    console.error('Error en la autenticación de Google:', error);
    res.status(500).json({ error: 'Error en la autenticación de Google' });
    return;
  }
}

module.exports = { handlerAutenticacionGoogle };
