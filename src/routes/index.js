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

// ----------------- matheus + felipe (arreglado y terminado por matheus) --------------
// -sistema de pago--
const  creaOCyDetalle = require('../controllers/sistemaDePago/postOcDet.js'); 
const  createPayment  = require("../controllers/sistemaDePago/paymentController.js")
const  receiveWebhook = require("../controllers/sistemaDePago/paymentController.js")
const  paymentNotif   = require("../controllers/sistemaDePago/paymentNotification.js");
// -------------------------------------------------------------------------------------

// ------------------------- felipe ----------------
// -libros
const { obtenerLibroPorId } = require('../controllers/libro/obtenerLibroPorId.js');
const { obtenerLibrosPorTitulo } = require('../controllers/libro/obtenerLibrosPorTitulo.js');
const { obtenerLibrosPorGenero } = require('../controllers/libro/obtenerLibrosPorGenero.js');
const { actualizarLibro } = require('../controllers/libro/actualizarLibro.js');
const { borradoLibro } = require('../controllers/libro/borradoLibro.js');
// -autores
const { obtenerAutores } = require('../controllers/autores/obtenerAutores.js');
const { obtenerAutorPorNombre } = require('../controllers/autores/obtenerAutorPorNombre.js');
const { obtenerAutorPorId } = require('../controllers/autores/obtenerAutorPorId.js');
// -generos
//const { obtenerGeneros } = require('../controllers/obtenerGeneros.js');
const { obtenerGeneros } = require('../controllers/generos/obtenerGeneros.js');

//reviews
const { reviews } = require('../controllers/reviews/review.controller.js');


const router = Router();

// ---------------- libros ------------------
router.post('/agregaLibro', autenticacionMiddlewareAdmin, agregaLibro ); // -auth admin
router.get('/obtenerLibros', obtenerLibros);
router.get("/obtenerLibroId/:idl", obtenerLibroPorId); 
router.get("/obtenerLibrosPorTitulo", obtenerLibrosPorTitulo);
router.get("/obtenerLibrosPorGenero", obtenerLibrosPorGenero);

router.delete("/borradoLibro/:idlibro", autenticacionMiddlewareAdmin, borradoLibro); // -auth admin
router.put("/actualizarLibro/:idlibro", autenticacionMiddlewareAdmin, actualizarLibro); // -auth admin

// ---------------- generos ------------------
router.get("/obtenerGeneros", obtenerGeneros);


//---------------sistema de pago --------------------
router.post("/generar-orden", autenticacionMiddleware, creaOCyDetalle );   /**aqui oc y detalle OK  */
router.post("/create-order", createPayment );

router.get("/success", (req, res) => res.send("success"));
router.get("/failure", (req, res) => res.send("failure"));
router.get("/pending", (req, res) => res.send("pending"));
router.post("/notifications", paymentNotif,);

// ---------------- usuarios y login ------------------
router.get("/usuarios", autenticacionMiddlewareAdmin, handlerTodosUsuarios); // -auth admin
router.get("/usuario/:idusuario", autenticacionMiddleware, handlerUsuarioPorId); // -auth
router.post("/crearUsuario", handleCrearUsuario);
// -auth local y google
router.post("/login", autenticacionLocalUsuario);
router.post("/login/google", handlerAutenticacionGoogle);
// -susp, unsusp, delete
router.delete("/usuario/:idusuario", autenticacionMiddlewareAdmin, handlerUsuarioDeletado); // -auth admin
router.put("/usuario/:idusuario/suspendido", autenticacionMiddlewareAdmin, handlerUsuarioSuspendido); // -auth admin
router.put("/usuario/:idusuario/nosuspendido", autenticacionMiddlewareAdmin, handlerUsuarioSinSuspension); // -auth admin

// ---------------- autor -------------------
router.get("/obtenerAutores", obtenerAutores);
router.get("/obtenerAutorNombre/:nombre", obtenerAutorPorNombre);
router.get("/obtenerAutorId/:ida", obtenerAutorPorId); 

// ---------------- estado api -------------------
router.get('/', (req, res) => { res.send('¡Bienvenido a la API!');});

// ---------------------reviews----------------------
router.post('/reviews/:idl', autenticacionMiddleware, async (req, res) => {
    const reviewExistente = await verificarReviewExistente(idoc, req.user.id);
    return reviewExistente ? res.status(400).json({ mensaje: 'Ya has realizado una review para esta orden de compra.' }) : res.json({ mensaje: 'Calificación y comentario agregados correctamente.' });
  });
  

module.exports = router;