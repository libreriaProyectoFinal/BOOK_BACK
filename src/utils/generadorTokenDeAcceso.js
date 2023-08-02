const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// Generar un token de acceso
async function generadorTokenDeAcceso(id, userRol) {
    // Defino la información que deseo incluir en el token

    const payload = {
        userId: id,
        rol: userRol
    };

    try {
        const token =  jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
        console.log(token)
        return token;
    } catch (error) {
        console.error(error);
        return '';
    }
}

module.exports = {
    generadorTokenDeAcceso,
};
