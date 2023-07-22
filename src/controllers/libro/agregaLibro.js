const { Libro, Genero } = require('../../db');
const agregaLibro = async (req, res) => {
 try {
   const { idlibro, nombrelibro, desclibro, obslibro, fotolibro, preciolibro, displibro, nombregenero, esborrado } = req.body;
   let genero = await Genero.findOne({
     where: {
      nombregenero: nombregenero.toLowerCase()
     }
   });

   if (!genero) {
    genero = await Genero.create({
     nombregenero: nombregenero.toLowerCase(),
     });
   }

   const nuevoLibro = await Libro.create({ idlibro, nombrelibro, desclibro, obslibro, fotolibro,
    preciolibro,  displibro, nombregenero,  esborrado  });

   res.status(201).json(nuevoLibro);
 } catch (error) {
   console.error('Error al crear un nuevo libro:', error);
   res.status(500).json({ error: 'Error al crear un nuevo libro' });
 }
};
module.exports ={ agregaLibro };