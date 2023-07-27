const { Libro } = require('../../db.js');

const borradoLibro = async (req, res) => {
  const { idlibro } = req.params;
 try {

   // Buscar el libro por su id
   const libro = await Libro.findOne({
    where: { idlibro },
  });

  

  if (!libro) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  // Verificar si el libro pertenece a un género
  if (libro.nombregenero) {
    // Obtener la cantidad de libros del mismo género que no han sido borrados
    const cantidadLibrosGenero = await Libro.count({
      where: { nombregenero: libro.nombregenero, esborrado: 0 },
    });
    
    // Si solo hay un libro del mismo género y no ha sido borrado, no se actualiza el atributo esborrado
    if (cantidadLibrosGenero === 1 && libro.esborrado === 0) {
   
      return res.status(400).json({ error: 'No se puede borrar el único libro de este género' });
    }
  }

  // Actualizar el atributo esborrado del libro
  const [numRowsUpdated, [updatedLibro]] = await Libro.update(
    { esborrado: 1 }, // Datos que se actualizarán
    {
      where: { idlibro },
      returning: true, // Devolver el registro actualizado
    }
  );

  if (numRowsUpdated === 0) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  res.status(200).json({msg:`borarste el libro con id ${idlibro}`, libro: updatedLibro });
 } catch (error) {
   console.error('Error al borrar libro:', error);
   res.status(500).json({ error: 'Error al borrar libro' });
 }
};
module.exports ={ borradoLibro };