const { Router } = require('express');

const { agregaLibro } = require('../controllers/libro/agregaLibro.js');
const { obtenerLibros } = require('../controllers/libro/obtenerLibros.js');

// ------------- matheus -----------------
// -usuarios
const { handlerTodosUsuarios, handlerUsuarioPorId, handleCrearUsuario } = require("../controllers/usuario/handler/handlerUsuario.js");
// -authLocal
const { autenticacionLocalUsuario } = require('../controllers/autenticacionLocal/autenticacionLocalUsuario.js');
// -authGoogle
const { handlerAutenticacionGoogle } = require('../controllers/usuarioGoogle/handler/handlerAutenticacionGoogle.js');
// ---------------------------------------

// ----------------------- waldir ------------------
// -libros
const { actualizarLibro } = require('../controllers/libro/actualizarLibro.js');
const { borradoLibro } = require('../controllers/libro/borradoLibro.js');
// -------------------------------------------------

// ------------------------- felipe ----------------
// -libros
const { obtenerLibroPorId } = require('../controllers/libro/obtenerLibroPorId.js');
// -autores
const { obtenerAutores } = require('../controllers/autores/obtenerAutores.js');
const { obtenerAutorPorNombre } = require('../controllers/autores/obtenerAutorPorNombre.js');
const { obtenerAutorPorId } = require('../controllers/autores/obtenerAutorPorId.js');
// -generos
const { obtenerGeneros } = require('../controllers/generos/obtenerGeneros.js');
const { obtenerLibroPorGenero } = require('../controllers/generos/ObtenerLibroPorGenero.js');
// -----------------------------------------



const router = Router();
// ------------ no mover esa ruta ---------------
router.get("/obtenerGeneros", obtenerGeneros);
// ----------------------------------------------

router.post('/agregaLibro',agregaLibro );
router.get('/obtenerLibros', obtenerLibros);
router.get("/obtenerLibroId/:idl", obtenerLibroPorId); 


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
router.get("/obtenerLibroPorGenero/:genero", obtenerLibroPorGenero);
router.get("/obtenerAutores", obtenerAutores);
router.get("/obtenerAutorNombre/:nombre", obtenerAutorPorNombre);
router.get("/obtenerAutorId/:ida", obtenerAutorPorId); 
router.get('/', (req, res) => { res.send('¡Bienvenido a la API!');});
// -------------------------------------------

module.exports = router;