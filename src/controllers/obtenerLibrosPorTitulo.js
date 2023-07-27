const { sequelize, Libro } = require('../db.js');

const obtenerLibrosPorTitulo = async (req, res) => {
  const titulo = req.params.titulo;
  const limitePagina = 4;

  try {
    const respuesta = await Libro.findAndCountAll({
      where: {       
        nombrelibro: {
          [sequelize.Sequelize.Op.like]: `%${titulo}%`,
        },
      },
      order: [['nombrelibro', 'ASC']],
      limit: limitePagina,
    });

    const totalLibros = respuesta.count;
    const totalPaginas = Math.ceil(totalLibros / limitePagina);
    const libros = respuesta.rows;

    res.json({
      totalLibros,
      totalPaginas,
      paginaActual: 1,
      limitePagina,
      libros,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el libro' });
  }
};

module.exports = { obtenerLibrosPorTitulo };