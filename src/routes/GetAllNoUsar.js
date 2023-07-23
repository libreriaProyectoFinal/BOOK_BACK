
const express = require('express');
const router = express.Router();
const  getAll  = require('../controllers/libro/getAll');

router.get("/me", getAll);

module.exports = router;



