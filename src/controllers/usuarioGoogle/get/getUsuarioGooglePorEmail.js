const { Usuario } = require("../../../db");
const { TipoUsuario } = require("../../../db");

const getUsuarioGooglePorEmail = async (email) => {
    const usuario = await Usuario.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
      include: [{
        model: TipoUsuario,
        attributes: ["rol"]
      }]
    });
    return usuario;
};

module.exports = {
    getUsuarioGooglePorEmail,
}