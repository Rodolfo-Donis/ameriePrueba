const express = require('express');
const router = express.Router();

const progra_controller = require('../controller/inicioController');

router.get('/inicio', progra_controller.login);

module.exports = router;