// Controlador para obtener un producto por su ID
const { Libro } = require('../db.js');

const obtenerTodosLibros = async  (req, res) =>{
 //const  idg  = req.params.ida;
 try {
  const respuesta = await Libro.findAll(
   {
    order: [['idlibro', 'ASC']],    
   }   
  );
  if (!respuesta)
  {
   return res.status(404).json({ mensaje: 'Libros no encontrados' });
  }
   res.json(respuesta);
   console.log(JSON.stringify(respuesta))
 } catch (error) {
   console.error(error);
   res.status(500).json({ mensaje: 'Error al obtener el Genero' });
 }
}
module.exports = { obtenerTodosLibros };