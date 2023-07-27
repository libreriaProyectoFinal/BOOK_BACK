
const express = require('express');
const router = express.Router();
const  getAll  = require('../controllers/getAll');

router.get("/me", getAll);

module.exports = router;



