// Controlador para obtener un producto por su ID
const { Autor } = require('../db.js');

const obtenerAutorPorId = async  (req, res) =>{
 const  ida  = req.params.ida;
 try {

  const respuesta = await Autor.findByPk( ida );
  if (!respuesta)
  {
   return res.status(404).json({ mensaje: 'Auror no encontrado' });
  }
   res.json(respuesta);
   console.log(JSON.stringify(respuesta))
 } catch (error) {
   console.error(error);
   res.status(500).json({ mensaje: 'Error al obtener el autor' });
 }
}
module.exports = { obtenerAutorPorId };