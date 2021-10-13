const controller = {};
const con = require('../config/connection');

controller.login = (req,res) => {
    res.render('catalogo');
}


module.exports = controller;