const bcrypt = require('bcrypt');
const { generadorTokenDeAcceso } = require('../../../src/utils/generadorTokenDeAcceso');
const { getUsuarioPorEmail } = require('../../controllers/usuario/get/getUsuarioPorEmail');

const autenticacionLocalUsuario = async (req, res) => {
    try {
        const { email, passwordKey } = req.body;
        console.log("body: ", req.body);

        // Buscar el usuario en la base de datos
        const user = await getUsuarioPorEmail(email);

        console.log(user);

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Comparar la contraseña ingresada con el hash de la contraseña almacenada
        const passwordValido = await bcrypt.compare(passwordKey, user.password);

        console.log("contraseña :", passwordValido);

        if (!passwordValido) {
            // Contraseña incorrecta
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const { password, ...nuevoUsuario } = user.toJSON();

        console.log('----------->', nuevoUsuario, '<----------');

        const token = await generadorTokenDeAcceso(nuevoUsuario.id);

        console.log("token :", token);

        // Usuario autenticado
        return res.status(200).json({ user: nuevoUsuario, accessToken: token });
    } catch (error) {
        // Si hay errores
        return res.status(500).json({ error: 'Error al procesar los datos' });
    }
};

module.exports = {
    autenticacionLocalUsuario,
};