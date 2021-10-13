const controller = {};
const con = require('../config/connection');

controller.login = (req,res) => {
    res.render('pedido');
}


module.exports = controller;