const express = require('express');
const router = express.Router();

const pedidos_controller = require('../controllers/pedidosController');

router.post('/creaPedido', pedidos_controller.crearPedido);
router.post('/cambiarEstado', pedidos_controller.cambiarEstado);
router.get('/obtener', pedidos_controller.getPedidos);

module.exports = router;