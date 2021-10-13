const controller = {};
const helper = require('../config/helper');
const con = require('../config/connection');

const direccion = 'https://82eqkj0ybl.execute-api.us-east-2.amazonaws.com/amariePostres';
const api = con(direccion);

controller.getCatalogo = (req, res) => {
    const recurso = '/obtenerCatalogo';
    api.get(recurso)
        .then(resp => {
            const json = JSON.parse(resp.data.body);
            const imgsFinded = {
                Productos: json.map(data => {
                    return {
                        producto: data.datos.Producto,
                        tipo: data.datos.Tipo,
                        imagen: data.datos.imagen,
                        descripcion: data.datos.Descripcion,
                        precio: data.datos.Precio,
                        precioOferta: data.datos.Precio_Oferta,
                        temporada: data.datos.Temporada,
                        url: data.url
                    }
                })
            }
            res.status(200).json({
                productos: imgsFinded.Productos
            });

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

module.exports = controller;