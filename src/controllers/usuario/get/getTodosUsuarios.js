const { Usuario } = require("../../../models/usuario");
const { TipoUsuarios } = require("../../../models/tipoUsuario");
const { Op } = require("sequelize");

const getTodosUsuarios = async () => {
    const todosUsuarios = await Usuario.findAll({
        include: {
          model: TipoUsuarios,
          where: {
            [Op.or]: [
              { rol: 'usuario' } // Filtras por el tipo "usuario"
            ]
          }
        }
    });
    
    return todosUsuarios;
}

module.exports = {
  getTodosUsuarios
}