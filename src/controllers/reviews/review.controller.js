const { Libro } = require('../../db.js'); 

const verificarReviewExistente = async (idoc, idusuario) => {
  const existingReview = await Review.findOne({
    where: { idoc, idusuario }
  });

  return existingReview !== null;
};


const reviews = async (req, res) => {
  const { idl } = req.params; 
  const { rating, comment } = req.body; 

  try {
    
    const libro = await Libro.findByPk(idl);

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    const reviewExistente = await verificarReviewExistente(idoc, usuario.id);
    if (reviewExistente) {
      return res.status(400).json({ mensaje: 'Ya has realizado una review para esta orden de compra.' });
    }

    const newReview = await Review.create({
      rating,
      comment,
      idoc,        
      idusuario: usuario.id  
    });

    res.json({ mensaje: 'Calificación y comentario agregados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar calificación y comentario' });
  }
};

module.exports = { reviews };
