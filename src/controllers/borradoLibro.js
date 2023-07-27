const { Libro } = require('../db.js');

const borradoLibro = async (req, res) => {
  const { idlibro } = req.params;
 try {
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