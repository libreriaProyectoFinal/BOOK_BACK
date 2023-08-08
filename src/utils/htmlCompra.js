const { Libro } = require("../db");

const htmlCompra = async(pedido) => {
    console.log(pedido)
    const id = pedido.id
    
    const total = pedido.valortotaloc
    const detalleocs = await pedido.getDetalleocs({include: [{model: Libro, as: 'libro',}]});
    console.log(detalleocs)
    let html =  "<h1>¡Gracias por comprar en Libreria Latam!</h1>" + 
    "<p>Estamos encantados de prestarte ese servicio y en pronto te estaremos enviando tu pedido.</p>"+
    " Id del pedido" + id + " y total: " + total+ "." +
    "<p>Tu resumen de pedido:</p>"+ " <ul>";

    for( let i = 0; i < detalleocs.length; i++) {
        const cantidad = detalleocs[i].cant
        const nombreLibroPagado = detalleocs[i].libro.nombrelibro
        const precioLibroPagado = detalleocs[i].libro.preciolibro
        html = html+ " <li>"+`Cantidad de Libros: ${cantidad}, Libro: ${nombreLibroPagado}, Precio: ${precioLibroPagado}`+"</li>"
    }
    //   <li>Producto 1: $20.00</li>
    //   <li>Producto 2: $30.00</li>
    //   <!-- Agrega aquí los detalles de los productos y el total del pedido -->

    html = html +  "</ul>"+"<p>¡Gracias de nuevo por tu compra!</p>";
    console.log(html);
    return html;

}

module.exports = {
    htmlCompra,
}
