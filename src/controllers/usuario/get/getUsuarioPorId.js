const { Usuario } = require("../../../db");
const { TipoUsuario } = require("../../../db");

const getUsuarioPorId = async (idusuario) => {
  const usuario = await Usuario.findOne({
    where: { idusuario },
    attributes: { exclude: ['password'] }, // Excluyo que aparezca la contraseña del usuario por ser confidencial
    include: [
      {
        model: TipoUsuario,
        attributes: ["rol"]
      }
    ]
  });

  if (!usuario) throw new Error(`El usuario con ID ${idusuario} no existe`);
  return usuario;
};

module.exports = {
  getUsuarioPorId
}
