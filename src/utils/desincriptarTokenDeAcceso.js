const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

async function desencriptarTokenDeAcceso(token) {
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        return decodedToken;
    } catch (error) {
        // Para cuando se ocurre algún error al desencriptar el token.
        console.error(error);
        return null;
    }
}

module.exports = {
    desencriptarTokenDeAcceso,
};