// Controlador para obtener las compras de un usuario por su ID
const { Usuario, Oc, Detalleoc, Libro } = require('../../db.js');

const obtenerComprasPorId = async (req, res) => {
  const idUsuario = req.params.idUsuario;

  try {
    // Llamar a la función para obtener las compras por usuario
    const compras = await obtenerOrdenesDeCompraConDetalleYLibros(idUsuario);
 // Procesar las compras antes de enviarlas al front-end
 const comprasProcesadas = compras.map((ordenCompra) => {
    // Obtener los detalles de la orden de compra
    const detalles = ordenCompra.detalleocs.map((detalle) => ({
      idDetalle: detalle.id,
    //   valorUnitario: detalle.valorunitario,
      cantidad: detalle.cant,
      subtotal: +detalle.subtotal,
      libro: {
        idLibro: detalle.libro.id,
        nombreLibro: detalle.libro.nombrelibro,
        precioLibro: detalle.libro.preciolibro,
        fotolibro:detalle.libro.fotolibro
        // Agregar más atributos del libro si es necesario
      },
    }));
    // Calcular el monto total de la compra y la cantidad total de libros comprados
    const montoTotal = detalles.reduce((total, detalle) => total + detalle.subtotal, 0);
    const cantidadTotal = detalles.reduce((total, detalle) => total + detalle.cantidad, 0);


    return {
      idOrdenCompra: ordenCompra.id,
      fechaCompra: ordenCompra.fechahoraoc, // O ajustar el atributo de fecha según tu modelo
      detalles,
      usuario:ordenCompra.usuario.name,
      montoTotal,
      cantidadTotal,
    };
  });
    // Retornar las compras como respuesta
    res.status(200).json(comprasProcesadas);
  } catch (error) {
    console.error('Error al obtener las compras del usuario:', error);
    // Manejar el error adecuadamente y retornar un mensaje de error o un valor adecuado
    res.status(500).json({ error: 'Ha ocurrido un error al obtener las compras del usuario' });
  }
};



const obtenerOrdenesDeCompraConDetalleYLibros = async (idUsuario) => {
  try {
    const ordenesDeCompra = await Oc.findAll({
      where: { usuarioIdusuario: idUsuario ,estadooc: 'approved' }, // Filtrar por ID del usuario
      include: [
        {
          model: Detalleoc,
          as: 'detalleocs',
          include: [
            {
              model: Libro,
              as: 'libro',
            },
          ],
        },
        {
          model: Usuario,
        },
      ],
    });

    return ordenesDeCompra;
  } catch (error) {
    console.error('Error al obtener las órdenes de compra:', error);
    throw error;
  }
};




module.exports = { obtenerComprasPorId };


