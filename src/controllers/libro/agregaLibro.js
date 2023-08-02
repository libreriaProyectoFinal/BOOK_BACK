const { Libro, Genero, Autor } = require('../../db.js');
const { obtenerLibroPorId } = require('./obtenerLibroPorId.js');
const agregaLibro = async (req, res) => {
  try {
    const { idlibro, nombrelibro, desclibro, nombreautor, obslibro, fotolibro, preciolibro, displibro, nombregenero, esborrado } = req.body;
    let genero = await Genero.findOne({
      where: {   nombregenero: nombregenero.toLowerCase(), }
    });

    if (!genero) {
      genero = await Genero.create({
      nombregenero: nombregenero.toLowerCase(),
      });
      }

    let autor = await Autor.findOne({
      where: {  nombreautor: nombreautor.toLowerCase(), }
    });

    if (!autor) {
      autor = await Autor.create({
      nombreautor: nombreautor.toLowerCase(),
      fotoautor:"http://fotoautor.jpg",
      });
    }

    const nuevoLibro = await Libro.create({ idlibro, nombrelibro, desclibro, obslibro, fotolibro,
      preciolibro,  displibro,  esborrado  });

      nuevoLibro.setAutor(autor)
      nuevoLibro.setGenero(genero)

      await nuevoLibro.save()

      const libroConAutorGenero = await Libro.findByPk( nuevoLibro.id, {include: [Autor, Genero]} );

    res.status(201).json(libroConAutorGenero);
  } catch (error) {
    console.error('Error al crear un nuevo libro:', error);
    res.status(500).json({ error: 'Error al crear un nuevo libro' });
  }
};
module.exports ={ agregaLibro };