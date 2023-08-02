const { desencriptarTokenDeAcceso } = require("./desincriptarTokenDeAcceso");

async function autenticacionMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        // Si no hay token, el usuario no está autenticado.
        return res.status(401).json({ error: "Acceso no autorizado." });
    }

    // Desencriptar el token
    const decodearToken = await desencriptarTokenDeAcceso(token);

    if (!decodearToken) {
        // Inválido o ha caducado(se caduca con 1 dia logueado): el usuario no se autenticara.
        return res.status(401).json({ error: "Acceso no autorizado." });
    }

    // Válido: almacenar la información del usuario para nuestras rutas protegidas.
    req.user = decodearToken;
    console.log(req.user)

    next();
}

async function autenticacionMiddlewareAdmin(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        // Si no hay token, el usuario no está autenticado.
        return res.status(401).json({ error: "Acceso no autorizado." });
    }

    // Desencriptar el token
    const decodearToken = await desencriptarTokenDeAcceso(token);

    if (!decodearToken) {
        // Inválido o ha caducado(se caduca con 1 dia logueado): el usuario no se autenticara.
        return res.status(401).json({ error: "Acceso no autorizado." });
    }

    // Válido: almacenar la información del usuario para nuestras rutas protegidas.
    req.user = decodearToken;
    console.log(decodearToken)

    const userRole = decodearToken.rol
    console.log(userRole);

    // Hacer la verificación que necesites, por ejemplo, si el usuario es un administrador:
    if (userRole !== 'admin') {
        return res.status(403).json({ error: "Acceso denegado. Solo los administradores pueden acceder a esta ruta." });
    }

    next();
}

module.exports = {
    autenticacionMiddleware,autenticacionMiddlewareAdmin,
};
