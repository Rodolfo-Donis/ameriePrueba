const express = require('express');
const router = express.Router();

const starter_controller = require('../controllers/starterController');

router.get('/carousel', starter_controller.getImgsCarousel);

module.exports = router;