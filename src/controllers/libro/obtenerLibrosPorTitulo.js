const { sequelize, Libro } = require('../../db.js');
const { Op } = require('sequelize');

const obtenerLibrosPorTitulo = async (req, res) => {

  const {pagina, titulo, limite} = req.query;

  const pagacual = Number(pagina);
  const offset = (pagina - 1) * limite;
  const librosPorPagina = Number(limite);

  try {
    const respuesta = await Libro.findAndCountAll({
      where: {  
        nombrelibro: {
          [Op.like]: `%${titulo}%`,
        },     
        esborrado: 0,
      },
      order: [['nombrelibro', 'ASC']],
      limit: librosPorPagina,
      offset
    });

    const totalLibros = respuesta.count;
    const totalPaginas = Math.ceil(totalLibros / librosPorPagina);
    const libros = respuesta.rows;

    res.json({
      paginaActual : pagacual,
      totalPaginas,
      librosPorPagina,
      totalLibros,    
      libros,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el libro' });
  }
};

module.exports = { obtenerLibrosPorTitulo };