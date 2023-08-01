// Controlador para obtener un producto por su ID
const { Genero } = require('../../db.js');

const obtenerGeneros = async  (req, res) =>{
 //const  idg  = req.params.ida;
 try {
  const respuesta = await Genero.findAll(
   {
    attributes: ['id', 'nombregenero'],
    order: [['nombregenero', 'ASC']],    
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
module.exports = { obtenerGeneros };