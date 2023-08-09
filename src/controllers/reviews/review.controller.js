const { Libro } = require('../../db.js'); 

const reviews = async (req, res) => {
  const { idl } = req.params; 
  const { rating, comment } = req.body; 

  try {
    
    const libro = await Libro.findByPk(idl);

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    // Actualizar la calificación y el comentario en el libro
    libro.rating = rating;
    libro.comment = comment;

    await libro.save();

    res.json({ mensaje: 'Calificación y comentario agregados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar calificación y comentario' });
  }
};

module.exports = { reviews };
