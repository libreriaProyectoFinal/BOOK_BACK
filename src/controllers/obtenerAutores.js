// Controlador para obtener un producto por su ID
const { Autor } = require('../db.js');

const obtenerAutores = async  (req, res) =>{
 //const  idg  = req.params.ida;
 try {
  const respuesta = await Autor.findAll(
   {
   order: [['nombreautor', 'ASC']],    
   }
 );
  if (!respuesta)
  {
   return res.status(404).json({ mensaje: 'Genero no encontrado' });
  }
   res.json(respuesta);
   console.log(JSON.stringify(respuesta))
 } catch (error) {
   console.error(error);
   res.status(500).json({ mensaje: 'Error al obtener el Genero' });
 }
}
module.exports = { obtenerAutores };