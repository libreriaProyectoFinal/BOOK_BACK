const { Usuario } = require("../../../db");

const suspenderUsuario = async (idusuario) => {
    try {
        const usuarioSuspendido = await Usuario.findByPk(idusuario);
        if(!usuarioSuspendido) {
            throw new Error("Usuario no encontrado")
        }

        usuarioSuspendido.isActive = false;
        await usuarioSuspendido.save();

        return usuarioSuspendido;

    } catch (error) {
        console.error(error);
        throw new Error("Error al suspender el usuario")
    }
}

const quitarSuspensionUsuario = async (idusuario) => {
    try {
        const usuarioSinSuspension = await Usuario.findByPk(idusuario);
        if(!usuarioSinSuspension) {
            throw new Error("Usuario no encontrado")
        }

        usuarioSinSuspension.isActive = true;
        await usuarioSinSuspension.save();

        return usuarioSinSuspension;

    } catch (error) {
        console.error(error);
        throw new Error("Error al quitar la suspender el usuario")
    }
}

module.exports = {
    suspenderUsuario,
    quitarSuspensionUsuario,
}
