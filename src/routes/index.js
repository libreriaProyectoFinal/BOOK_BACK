const { Router } = require('express');

const { agregaLibro } = require('../controllers/libro/agregaLibro.js');
const { obtenerLibros } = require('../controllers/libro/obtenerLibros.js');
const { handlerTodosUsuarios, handlerUsuarioPorId, handleCrearUsuario } = require("../controllers/usuario/handler/handlerUsuario.js");

const router = Router();

router.post('/agregaLibro',agregaLibro );
router.get('/obtenerLibros', obtenerLibros);

router.get("/usuarios", handlerTodosUsuarios);
router.get("/:idusuario", handlerUsuarioPorId);
router.post("/crearUsuario", handleCrearUsuario);

router.get('/', (req, res) => { res.send('¡Bienvenido a la API!');});

module.exports = router;