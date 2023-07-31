const { Router } = require('express');

const { agregaLibro } = require('../controllers/libro/agregaLibro.js');
const { obtenerLibros } = require('../controllers/libro/obtenerLibros.js');

// ------------- matheus -----------------

// -authLocal
const { autenticacionLocalUsuario } = require('../controllers/autenticacionLocal/autenticacionLocalUsuario.js');
// -authGoogle
const { handlerAutenticacionGoogle } = require('../controllers/usuarioGoogle/handler/handlerAutenticacionGoogle.js');
 const { handlerTodosUsuarios, handlerUsuarioPorId, handleCrearUsuario } = require("../controllers/usuario/handler/handlerUsuario.js");
// ---------------------------------------

// -------------------------------------------------

// ------------------------- felipe ----------------
// -libros
const { obtenerLibroPorId } = require('../controllers/libro/obtenerLibroPorId.js');
const { obtenerLibrosPorTitulo } = require('../controllers/libro/obtenerLibrosPorTitulo.js');
const { obtenerLibrosPorGenero } = require('../controllers/libro/obtenerLibrosPorGenero.js');

// ---------------------------------------
// -libros
const { actualizarLibro } = require('../controllers/libro/actualizarLibro.js');
const { borradoLibro } = require('../controllers/libro/borradoLibro.js');

// -autores
const { obtenerAutores } = require('../controllers/autores/obtenerAutores.js');
const { obtenerAutorPorNombre } = require('../controllers/autores/obtenerAutorPorNombre.js');
const { obtenerAutorPorId } = require('../controllers/autores/obtenerAutorPorId.js');
// -generos
const { obtenerGeneros } = require('../controllers/generos/obtenerGeneros.js');

//const { obtenerGeneros } = require('../controllers/obtenerGeneros.js');

// -sistema de pago--
const  creaOCyDetalle  = require('../controllers/sistemaDePago/postOcDet.js'); 
const  createPayment  = require("../controllers/sistemaDePago/paymentController.js");
const  paymentNotif  = require("../controllers/sistemaDePago/paymentNotification.js");


const router = Router();
// ------------ no mover esa ruta (felipe) ---------------


// ---------------- libros ------------------
router.post('/agregaLibro',agregaLibro );
router.get('/obtenerLibros', obtenerLibros);
router.get("/obtenerLibroId/:idl", obtenerLibroPorId); 
router.get("/obtenerLibrosPorTitulo", obtenerLibrosPorTitulo);
router.get("/obtenerLibrosPorGenero", obtenerLibrosPorGenero);

router.delete("/borradoLibro/:idlibro", borradoLibro);
router.put("/actualizarLibro/:idlibro", actualizarLibro);

// ---------------- generos ------------------
router.get("/obtenerGeneros", obtenerGeneros);


//---------------sistema de pago
router.post("/generar-orden", creaOCyDetalle );   /**aqui oc y detalle OK  */
router.post("/create-order", createPayment );

router.get("/success", async (req,res) => { 
     res.status(201);
} );
router.get("/failure", async (req,res) => { 
     res.status(202);
} );
router.get("/pending", async (req,res) => { 
     res.status(203);
} );

router.post("/notifications", paymentNotif,);


// ---------------- usuarios y login ------------------
 router.get("/usuarios", handlerTodosUsuarios);
 router.get("/usuarios/:idusuario", handlerUsuarioPorId);
 router.post("/crearUsuario", handleCrearUsuario);

 router.post("/login", autenticacionLocalUsuario);

// ---------------- autor -------------------
router.get("/obtenerAutores", obtenerAutores);
router.get("/obtenerAutorNombre/:nombre", obtenerAutorPorNombre);
router.get("/obtenerAutorId/:ida", obtenerAutorPorId); 

// ---------------- estado api -------------------
router.get('/', (req, res) => { res.send('¡Bienvenido a la API!');});
// -------------------------------------------

module.exports = router;