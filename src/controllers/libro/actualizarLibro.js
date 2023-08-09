// librosController.js

const { Libro, Autor,Genero } = require('../../db.js'); // Importa el modelo de Sequelize

// Función para actualizar un libro en la base de datos
const actualizarLibro = async (req, res) => {
    const { idlibro } = req.params
  const {  nombrelibro, desclibro, obslibro,nombreautor, fotolibro, preciolibro, displibro, nombregenero, } = req.body;
console.log(req.body)
  try {
    // Buscar el libro en la base de datos por su idlibro
    const libro = await Libro.findByPk(idlibro, {include: [Autor, Genero]});
console.log('el libro y su genero:' , libro.genero)
    if (!libro) {
      // Si el libro no se encuentra, devuelve un error
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    // Actualizar los campos del libro con los datos recibidos del frontend
    libro.nombrelibro = nombrelibro;
    libro.desclibro = desclibro;
    libro.obslibro = obslibro; 
    // Verificar y actualizar el género
   if (nombreautor) {
    let autor = await Autor.findOne({ where: { nombreautor } });
    if (!autor) {
      // Si el género no existe, crear uno nuevo
      autor = await Autor.create({ nombreautor });
    }
    libro.autorId = autor.id; // Asignar el nuevo id del género al libro
  }

    libro.fotolibro = fotolibro;
    libro.preciolibro = preciolibro;
    libro.displibro = displibro;
   // Verificar y actualizar el género
   if (nombregenero) {
    let genero = await Genero.findOne({ where: { nombregenero } });
    if (!genero) {
      // Si el género no existe, crear uno nuevo
      genero = await Genero.create({ nombregenero });
    }
    libro.generoId = genero.id; // Asignar el nuevo id del género al libro
  }
    
    

    // Guardar los cambios en la base de datos
    await libro.save();

    // Devolver la respuesta con el libro actualizado
    res.status(200).json({libro:libro, message:'libro Editado correcto'});
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

module.exports = { actualizarLibro };
