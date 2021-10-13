require('dotenv').config();

var logger = require('morgan');
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var routes_start = require('./routes/starter');
var routes_products = require('./routes/productos');
var routes_orders = require('./routes/pedidos');

app.use('/starter', routes_start);
app.use('/productos', routes_products);
app.use('/pedidos', routes_orders);

app.listen(port, function(){
    console.log('Servidor corriendo en el puerto: ' + port);
});