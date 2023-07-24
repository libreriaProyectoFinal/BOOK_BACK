const {sequelize, Libro, Genero} = require('../../db');
const obtenerLibroPorGenero = async  (req, res) =>{
 const  genero  = req.params.genero;
 const limitePagina =  4;
 try {
  const respuesta = await sequelize.query(
   `SELECT * FROM libros WHERE nombregenero LIKE '%${genero}%' ORDER BY nombrelibro ASC`,
   {
     type: sequelize.QueryTypes.SELECT,
   }
 );
    res.json({respuesta})

 } catch (error) {
   console.error(error);
   res.status(500).json({ mensaje: 'Error al obtener el libro' });
 }
}
module.exports = { obtenerLibroPorGenero };