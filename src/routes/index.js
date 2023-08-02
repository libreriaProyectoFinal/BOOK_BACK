const { Router } = require('express');

const { agregaLibro } = require('../controllers/libro/agregaLibro.js');
const { obtenerLibros } = require('../controllers/libro/obtenerLibros.js');

// ------------- matheus -----------------
// -authLocal
const { autenticacionLocalUsuario } = require('../controllers/autenticacionLocal/autenticacionLocalUsuario.js');
// -authGoogle
const { handlerAutenticacionGoogle } = require('../controllers/usuarioGoogle/handler/handlerAutenticacionGoogle.js');
// -users
const { handlerTodosUsuarios, handlerUsuarioPorId, handleCrearUsuario } = require("../controllers/usuario/handler/handlerUsuario.js");
// -quitar suspencion, supencion y deletar usuarios
const { handlerUsuarioDeletado, handlerUsuarioSuspendido, handlerUsuarioSinSuspension } = require("../controllers/usuario/handler/handlerUsuario.js");
// -protecion rutas
const { autenticacionMiddleware, autenticacionMiddlewareAdmin } = require("../utils/autenticacionMiddleware.js");
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
const  createPaymentPreference  = require("../controllers/sistemaDePago/paymentController.js");
const  { handlePaymentNotification, receiveWebhook } = require("../controllers/sistemaDePago/paymentController.js");

const router = Router();
// ------------ no mover esa ruta (felipe) ---------------


// ---------------- libros ------------------
router.post('/agregaLibro', autenticacionMiddlewareAdmin, agregaLibro ); // -auth admin
router.get('/obtenerLibros', obtenerLibros);
router.get("/obtenerLibroId/:idl", obtenerLibroPorId); 
router.get("/obtenerLibrosPorTitulo", obtenerLibrosPorTitulo);
router.get("/obtenerLibrosPorGenero", obtenerLibrosPorGenero);

router.delete("/borradoLibro/:idlibro", borradoLibro); // -auth admin
router.put("/actualizarLibro/:idlibro", actualizarLibro); // -auth admin

// ---------------- generos ------------------
router.get("/obtenerGeneros", obtenerGeneros);


//---------------sistema de pago
router.post('/generar-orden', creaOCyDetalle ); // -auth  /**aqui oc y detalle OK  */
router.post("/create-order", createPaymentPreference ); // -auth

// ---------------- usuarios y login ------------------
router.get("/usuarios", handlerTodosUsuarios); // -auth admin
router.get("/usuario/:idusuario", handlerUsuarioPorId); // -auth
router.post("/crearUsuario", handleCrearUsuario);
// -auth local y google
router.post("/login", autenticacionLocalUsuario);
router.post("/login/google", handlerAutenticacionGoogle);
// -susp, unsusp, delete
router.delete("/usuario/:idusuario", handlerUsuarioDeletado); // -auth admin
router.put("/usuario/:idusuario/suspendido", handlerUsuarioSuspendido); // -auth admin
router.put("/usuario/:idusuario/nosuspendido", handlerUsuarioSinSuspension); // -auth admin

// ---------------- autor -------------------
router.get("/obtenerAutores", obtenerAutores);
router.get("/obtenerAutorNombre/:nombre", obtenerAutorPorNombre);
router.get("/obtenerAutorId/:ida", obtenerAutorPorId); 

// ---------------- estado api -------------------
router.get('/', (req, res) => { res.send('¡Bienvenido a la API!');});
// -------------------------------------------

module.exports = router;