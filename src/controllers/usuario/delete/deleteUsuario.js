const { Usuario } = require("../../../db");

const deletarUsuario = async (idusuario) => {
    try {
        const usuarioDeletado = await Usuario.destroy({where: { idusuario: idusuario}})
        return usuarioDeletado;
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar al usuario')
    }
}

module.exports = {
    deletarUsuario,
}