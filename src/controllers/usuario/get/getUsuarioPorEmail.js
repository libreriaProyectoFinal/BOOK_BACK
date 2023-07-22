const { Usuario } = require("../../../db");
const { TipoUsuario } = require("../../../db");
const getUsuarioPorEmail = async (email) => {
  console.log(Usuario)
  const usuario = await Usuario.findOne({
    where: { email },
    include: [
      {
        model: TipoUsuario,
        attributes: ["rol"]
      }
    ]
  });

  return usuario;
};

module.exports = { 
  getUsuarioPorEmail
};
