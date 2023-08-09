// controllers/comprasController.js
const { Oc } = require("../../db");
const { Detalleoc } = require("../../db");
const { Libro } = require("../../db");
const { Usuario } = require("../../db");


const getTodasCompras = async (req, res) => {
    try {
        const compras = await Oc.findAll({
            attributes: ['id', 'estadooc', 'fechahoraoc', 'hashvalidacionpago', 'valortotaloc'],
            include: [{
                model: Detalleoc,
                include: {
                    model: Libro,
                    as: "libro",
                }
            } , Usuario]
        });
        console.log("compras: ", compras);
        res.json({compras});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getTodasCompras
};
