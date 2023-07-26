const {sequelize,Autor, Op } = require('../../db.js');

const obtenerAutorPorNombre = async (req, res) => {
  const autor = req.params.nombre;
  try {
   const respuesta = await sequelize.query(
    `SELECT * FROM autors WHERE nombreautor LIKE '%${autor}%' ORDER BY nombreautor ASC`,
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );

    if (!respuesta || respuesta.length === 0) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }

    res.json(respuesta);
    console.log(JSON.stringify(respuesta));
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el autor' });
  }
};

module.exports = { obtenerAutorPorNombre , Op};
