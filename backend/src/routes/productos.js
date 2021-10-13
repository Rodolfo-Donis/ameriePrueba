const express = require('express');
const router = express.Router();

const products_controller = require('../controllers/productosController');

router.get('/catalogo', products_controller.getCatalogo);

module.exports = router;