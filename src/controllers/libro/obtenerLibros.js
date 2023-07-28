const { Libro, Genero, Autor } = require('../../db.js');

async function obtenerLibros(req, res) { 
  const pagina = parseInt(req.query.pagina) || 1;
  const porPagina = parseInt(req.query.limite) || 4;
  // Cálculo de los índices para la paginación
  const offset = (pagina - 1) * porPagina;
  try {
    // Realizar la consulta con Sequelize usando las opciones limit y offset para la paginación
    const { rows, count } = await Libro.findAndCountAll({
      limit: porPagina,
      offset,
      include: [Autor, Genero]
    });

    const totalPaginasx = Math.ceil(count / porPagina);

    res.json({     
      paginaActual: pagina,
      totalPaginas: totalPaginasx,
      librosPorPagina: porPagina,
      totalLibros: count,
      libros: rows,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros.' });
  }
}

module.exports = { obtenerLibros };
