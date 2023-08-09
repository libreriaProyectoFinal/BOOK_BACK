const { Libro,Genero } = require('../../db.js');

const borradoLibro = async (req, res) => {
  const { idlibro } = req.params;
  console.log('el id: ' + idlibro)
 try {

   // Buscar el libro por su id
   const libro = await Libro.findByPk(idlibro, { include: [Genero] });

   if (!libro) {
     return res.status(404).json({ error: 'Libro no encontrado' });
   }

  console.log(libro.genero)

  
   // Verificar si el libro pertenece a un género y si es único en ese género
   if (libro.genero && libro.genero.nombregenero) {
    const cantidadLibrosGenero = await Libro.count({
      where: {
        generoId: libro.generoId,
        esborrado: 0,
      },
    });

    if (cantidadLibrosGenero === 1 && libro.esborrado === 0) {
      return res.status(401).json({ error: 'No se puede borrar el único libro de este género' });
    }
  }

  // Actualizar el atributo esborrado del libro
 
  await libro.update({ esborrado: 1 });

  res.status(200).json({msg:`borraste el libro con id ${idlibro}`, libro: libro });
 } catch (error) {
   console.error('Error al borrar libro:', error);
   res.status(500).json({ error: 'Error al borrar libro' });
 }
};
module.exports ={ borradoLibro };