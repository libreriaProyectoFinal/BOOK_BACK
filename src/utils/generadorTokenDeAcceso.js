const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// Generar un token de acceso
async function generadorTokenDeAcceso(userId, userRol) {
    // Defino la información que deseo incluir en el token
    const payload = {
        userId: userId,
        type: userRol
    };
    try {
        const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
        return token;
    } catch (error) {
        console.error(error);
        return '';
    }
}

module.exports = {
    generadorTokenDeAcceso,
};