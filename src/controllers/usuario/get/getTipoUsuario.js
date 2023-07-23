const { TipoUsuarios } = require("../../../db");

// Mostrar los tipos de usuarios
const getTipoUsuario = async () => { 
  const TipoUsuario = await TipoUsuarios.findAll();
  console.log("Tipo: ", TipoUsuario);
  return TipoUsuario;
};

module.exports = {
  getTipoUsuario
}
