const { Usuario } = require("../../../db");
const { TipoUsuario } = require("../../../db");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { getUsuarioPorEmail } = require("../get/getUsuarioPorEmail");
const { getUsuarioPorId } = require("../get/getUsuarioPorId");
const { respuestaEmailCreacionUsuario } = require('../../../utils/respuestaEmailCreacionUsuario')


const postCrearUsuario = async (name, password, email, nickname, picture, rol) => {
    if (!name || name === "") throw new Error("El usuario debe tener un nombre");
    if (!password || password === "") throw new Error("El usuario debe tener una contraseña");
    if (!email || email === "") throw new Error("El usuario debe tener un correo electrónico");
    if (!nickname || nickname === "") throw new Error("El usuario debe tener un nickname");
    if (!picture || picture === "") throw new Error("El usuario debe tener una foto");
    if (!rol || rol === "") throw new Error("El usuario debe tener un rol");

    const usuarioYaListado = await getUsuarioPorEmail(email);

    if (usuarioYaListado) {
        throw new Error("Ya existe un usuario con el mismo correo electrónico.")
    }

    // Creación del usuario
    const usuario = await Usuario.create({
        idusuario: uuidv4(),
        name,
        password: await bcrypt.hash(password, 10),
        email,
        nickname,
        picture,
        // totalReviews: 0.0
    });

    // Vinculación con el tipo de usuario
    console.log(TipoUsuario)
    const tipoUsuario = await TipoUsuario.findOne({ where: { rol: rol } });
    if (tipoUsuario) {
        // console.log("----->rol: ", tipoUsuario.rol);
        await usuario.setTipoUsuario(tipoUsuario);
        let usuarioFinal = await usuario.save();
        respuestaEmailCreacionUsuario(usuarioFinal.email);
        console.log("final:", usuarioFinal);

        let formatoDeUsuario = await getUsuarioPorId(usuarioFinal.idusuario);

        if (formatoDeUsuario) { // Verificación de que el usuario se creó correctamente
            return formatoDeUsuario;
        } else {
            throw new Error("Error al crear el usuario.")
        }

    } else {
        await Usuario.destroy({ where: { idusuario: usuario.idusuario } });
        throw new Error("El tipo proporcionado no es válido, debe ser admin o usuario")
    }
};

// Exportando la función si es necesario
module.exports = {
    postCrearUsuario
};
