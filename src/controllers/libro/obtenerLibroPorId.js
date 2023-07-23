// Controlador para obtener un producto por su ID
const { Libro, Genero} = require('../../db');

const obtenerLibroPorId = async  (req, res) =>{
 const  idl  = req.params.idl;

 try {

  const respuesta = await Libro.findByPk( idl );
  if (!respuesta)
  {
   return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

   res.json(respuesta);
   console.log(JSON.stringify(respuesta))
 } catch (error) {
   console.error(error);
   res.status(500).json({ mensaje: 'Error al obtener el libro' });
 }
}
module.exports = { obtenerLibroPorId };
