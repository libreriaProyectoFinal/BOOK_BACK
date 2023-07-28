// Controlador para obtener un libro por su ID
const { Libro, Genero, Autor} = require('../../db.js');

const obtenerLibroPorId = async  (req, res) =>{
 const  idl  = req.params.idl;

 try {

  let respuesta = await Libro.findByPk( idl , {include: [Autor, Genero]});
  if(respuesta?.esborrado){
    respuesta=null;
  }
  if (!respuesta) { return res.status(404).json({ mensaje: 'Libro no encontrado' });  }
   res.json(respuesta);
   console.log(JSON.stringify(respuesta))
 } catch (error) {
   console.error(error);
   res.status(500).json({ mensaje: 'Error al obtener el libro' });
 }
}
module.exports = { obtenerLibroPorId };