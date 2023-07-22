const { Libro, Genero} = require('../../db.js');

async function obtenerLibros(req, res) {
 const { pagina, limite } = req.query;
 const numPagina = parseInt(pagina) || 1;
 const limitePagina = parseInt(limite) || 8;
 const offset = (numPagina - 1) * limitePagina;

 try {
   const { count, rows } = await Libro.findAndCountAll({
     offset,
     limite: limitePagina,
   });

   const totalPaginas = Math.ceil(count / limitePagina);

   res.json({
     totalLibros: count,
     totalPaginas,
     paginaActual: numPagina,
     limitePagina,
     libros: rows,
   });
 } catch (error) {
   console.error(error);
   res.status(500).json({ mensaje: 'Error al obtener la lista de libros' });
 }

}
module.exports = { obtenerLibros };