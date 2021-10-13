const express = require('express');
const router = express.Router();

const program_controller = require('../controller/contactoController');

router.get('/contacto', program_controller.login);
//router.post('/login', program_controller.inicioS);

module.exports = router;