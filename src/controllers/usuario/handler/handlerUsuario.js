const { getUsuarioPorEmail } = require("../get/getUsuarioPorEmail");
const { getUsuarioPorId } = require("../get/getUsuarioPorId");
const { getTodosUsuarios } = require("../get/getTodosUsuarios");
const { getTipoUsuario } = require("../get/getTipoUsuario");
// ------------------- get -------------------------

const { postCrearUsuario } = require("../post/crearUsuario");
// ------------------- post ------------------------

// Obtener todos los usuarios
const handlerTodosUsuarios = async (req, res) => {
  try {
    const response = await getTodosUsuarios();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener usuario por ID
const handlerUsuarioPorId = async (req, res) => {
  try {
    const { idusuario } = req.params;
    const response = await getUsuarioPorId(idusuario);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Obtener usuario por correo electrónico
const handleUsuarioPorEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const response = await getUsuarioPorEmail(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Crear usuario
const handleCrearUsuario = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const response = await postCrearUsuario(
      body?.name,
      body?.password,
      body?.email,
      body?.nickname,
      body?.picture,
      body?.rol,
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --------------------------------------------------- para el dashboard

// Eliminar usuario
// const handleDeleteUser = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const deletedUser = await deleteUser(userId);

//     if (deletedUser) {
//       res.status(200).json({ message: "Usuario eliminado." });
//     } else {
//       res.status(404).json({ message: "Usuario no encontrado." });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al eliminar al usuario." });
//   }
// };

// Suspender usuario
// const handleSuspendUser = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const suspendedUser = await suspendUser(userId);

//     if (suspendedUser) {
//       res.status(200).json({ message: "Usuario suspendido." });
//     } else {
//       res.status(404).json({ message: "Usuario no encontrado." });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al suspender al usuario." });
//   }
// };

// // Quitar suspensión al usuario
// const handleUnsuspendUser = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const unSuspendedUser = await unSuspendUser(userId);

//     if (unSuspendedUser) {
//       res.status(200).json({ message: "Se quitó la suspensión del usuario." });
//     } else {
//       res.status(404).json({ message: "Usuario no encontrado." });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al quitar la suspensión." });
//   }
// };

// ----------------------------------------- para el dashboard

module.exports = {
  handlerTodosUsuarios,
  handlerUsuarioPorId,
  handleUsuarioPorEmail,
  handleCrearUsuario,
//   handleDeleteUser,
//   handleSuspendUser,
//   handleUnsuspendUser,
};
