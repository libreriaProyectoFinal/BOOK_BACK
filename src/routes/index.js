const { Router } = require('express');

const { agregaLibro } = require('../controllers/libro/agregaLibro.js');
const { obtenerLibros } = require('../controllers/libro/obtenerLibros.js');

// ------------- matheus -----------------

// -authLocal
const { autenticacionLocalUsuario } = require('../controllers/autenticacionLocal/autenticacionLocalUsuario.js');
// -authGoogle
const { handlerAutenticacionGoogle } = require('../controllers/usuarioGoogle/handler/handlerAutenticacionGoogle.js');
 const { handlerTodosUsuarios, handlerUsuarioPorId, handleCrearUsuario } = require("../controllers/usuario/handler/handlerUsuario.js");
// // -authLocal
 const { autenticacionLocalUsuario } = require('../controllers/autenticacionLocal/autenticacionLocalUsuario.js')
// ---------------------------------------
// ----------------------- waldir ------------------
// -libros
const { actualizarLibro } = require('../controllers/libro/actualizarLibro.js');
const { borradoLibro } = require('../controllers/libro/borradoLibro.js');
// -------------------------------------------------

// ------------------------- felipe ----------------
// -libros
const { obtenerLibroPorId } = require('../controllers/libro/obtenerLibroPorId.js');
const { obtenerLibrosPorTitulo } = require('../controllers/libro/obtenerLibrosPorTitulo.js');
const { obtenerLibrosPorGenero } = require('../controllers/libro/obtenerLibrosPorGenero.js');
// -autores
const { obtenerAutores } = require('../controllers/autores/obtenerAutores.js');
const { obtenerAutorPorNombre } = require('../controllers/autores/obtenerAutorPorNombre.js');
const { obtenerAutorPorId } = require('../controllers/autores/obtenerAutorPorId.js');
// -generos
const { obtenerGeneros } = require('../controllers/generos/obtenerGeneros.js');

//const { obtenerGeneros } = require('../controllers/obtenerGeneros.js');
// -sistema de pago--
const  creaOCyDetalle  = require('../controllers/sistemaDePago/postOcDet.js'); 
const  createPaymentPreference  = require("../controllers/sistemaDePago/paymentController.js");
const  { handlePaymentNotification, receiveWebhook } = require("../controllers/sistemaDePago/paymentController.js");

const router = Router();
// ------------ no mover esa ruta (felipe) ---------------

router.get("/obtenerGeneros", obtenerGeneros);

//---------------sistema de pago
router.post('/generar-orden', creaOCyDetalle );   /**aqui oc y detalle OK  */
router.post("/create-order", createPaymentPreference );
//-----------------------------
router.post('/agregaLibro',agregaLibro );
router.get('/obtenerLibros', obtenerLibros);
router.get("/obtenerLibroId/:idl", obtenerLibroPorId); 
// ----------------------------------------------

router.post('/agregaLibro',agregaLibro );

// ---------------- matheus ------------------
router.get("/usuarios", handlerTodosUsuarios);
router.get("/:idusuario", handlerUsuarioPorId);
router.post("/crearUsuario", handleCrearUsuario);
router.post("/login", autenticacionLocalUsuario);
router.post("/login/google", handlerAutenticacionGoogle);
// -------------------------------------------
// ---------------- waldir -------------------
router.delete("/borradoLibro/:idlibro", borradoLibro);
router.put("/actualizarLibro/:idlibro", actualizarLibro);
// -------------------------------------------
// ---------------- felipe -------------------

router.get("/obtenerLibrosPorTitulo", obtenerLibrosPorTitulo);
router.get("/obtenerLibrosPorGenero", obtenerLibrosPorGenero);
router.get("/obtenerAutores", obtenerAutores);
router.get("/obtenerAutorNombre/:nombre", obtenerAutorPorNombre);
router.get("/obtenerAutorId/:ida", obtenerAutorPorId); 
router.get('/', (req, res) => { res.send('¡Bienvenido a la API!');});
// -------------------------------------------

module.exports = router;