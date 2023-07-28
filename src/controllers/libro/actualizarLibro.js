// librosController.js

const { Libro } = require('../../db.js'); // Importa el modelo de Sequelize

// Función para actualizar un libro en la base de datos
const actualizarLibro = async (req, res) => {
    const { idlibro } = req.params
  const {  nombrelibro, desclibro, obslibro,nombreautor, fotolibro, preciolibro, displibro, nombregenero, } = req.body;

  try {
    // Buscar el libro en la base de datos por su idlibro
    const libro = await Libro.findByPk(idlibro, {include: [Autor, Genero]});

    if (!libro) {
      // Si el libro no se encuentra, devuelve un error
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    // Actualizar los campos del libro con los datos recibidos del frontend
    libro.nombrelibro = nombrelibro;
    libro.desclibro = desclibro;
    libro.obslibro = obslibro;
    libro.nombreautor=nombreautor;
    libro.fotolibro = fotolibro;
    libro.preciolibro = preciolibro;
    libro.displibro = displibro;
    libro.nombregenero = nombregenero;
    
    

    // Guardar los cambios en la base de datos
    await libro.save();

    // Devolver la respuesta con el libro actualizado
    res.status(200).json(libro);
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

module.exports = { actualizarLibro };
