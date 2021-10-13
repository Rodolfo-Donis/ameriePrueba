const controller = {};
const helper = require('../config/helper');
const con = require('../config/connection');

const direccion = 'https://82eqkj0ybl.execute-api.us-east-2.amazonaws.com/amariePostres';
const api = con(direccion);

/**
 * /cambiarEstado POST
 * /crearPedido POST
*/

controller.getImgsCarousel = (req, res) => {
    const recurso = '/imgsCarousel';
    api.get(recurso)
        .then(resp => {
            console.log("*********************************************Esto sale: " + resp.data.body); 
            const json = JSON.parse(resp.data.body);
            const imgsFinded = {
                imageness: json.map(data => {
                    return {
                        tipo: data.Tipo,
                        titulo: data.Titulo,
                        url: data.URL
                    }
                })
            }
            res.status(200).json({
                imagenes: imgsFinded.imageness
            });

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

module.exports = controller;