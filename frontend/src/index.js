const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//index route
app.get('/', (req, res) => {
    res.redirect('/inicio/inicio');
});
// routes
app.use('/inicio', require('./routes/inicio'));
app.use('/inicio', require('./routes/contacto'));
app.use('/inicio', require('./routes/nosotros'));
app.use('/inicio', require('./routes/pedido'));
app.use('/inicio', require('./routes/catalogo'));
//app.use('/clients', require('./routes/clients'));

const port = process.env.PORT || 3000;

app.listen(port, console.log('Servidor corriendo en puerto '+port));