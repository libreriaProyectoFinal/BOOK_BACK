const { sequelize, Libro, Genero } = require('../../db');

const obtenerLibroPorGenero = async (req, res) => {
  const genero = req.params.genero;
  const limitePagina = 4;

  try {
    const respuesta = await Libro.findAndCountAll({
      where: {
        nombregenero: {
          [sequelize.Sequelize.Op.like]: `%${genero}%`,
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

module.exports = { obtenerLibroPorGenero };
