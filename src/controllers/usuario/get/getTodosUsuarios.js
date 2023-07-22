const { Usuario } = require("../../../db");
const { TipoUsuario } = require("../../../db");
// const { Op } = require("sequelize");

const getTodosUsuarios = async () => {
    const todosUsuarios = await Usuario.findAll({
        include: {
          model: TipoUsuario,
          where: { 
            rol: 'usuario' 
          } // Filtras por el tipo "usuario"
        }
    });
    
    return todosUsuarios;
}

module.exports = {
  getTodosUsuarios
}