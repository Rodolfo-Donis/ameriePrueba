const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/authController');

router.get('/users', auth_controller.obtenerUsuarios);

router.get('/login', auth_controller.login);

router.post('/register', auth_controller.agregar);

module.exports = router;