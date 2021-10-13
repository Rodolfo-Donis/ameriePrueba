const controller = {};
const helper = require('../config/helper');
const con = require('../config/connection');

const direccion = 'https://82eqkj0ybl.execute-api.us-east-2.amazonaws.com/amariePostres';
const api = con(direccion);

controller.crearPedido = (req, res) => {
    const { NumOrder, Descripcion } = req.body;

    const body = {
        "pedido": NumOrder,
        "estado": 'En Cola',
        "statuss": 'A',
        "desc": Descripcion
    }

    const url = '/crearPedido';

    api.post(url, body).then(resp => {

        response = {
            statusCode: 200,
            body: resp.data,
        };
        res.status(200).json(response);

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    });
}

controller.cambiarEstado = (req, res) => {
    const { NumOrder, Estado } = req.body;

    let Statuss = 'A';
    let Estadin;

    switch (Estado) {
        case 1://en cola
        Estadin = 'En Cola';
            break;
        case 2://preparando
        Estadin = 'Preparando';
            break;
        case 3://Listo para enviar
        Estadin = 'Listo para enviar';
            break;
        case 4://Enviado
        Estadin = 'Enviado';
            break;
        case 5://Entregado
        Estadin = 'Entregado';
        Statuss = 'I'
            break;
        default:
            break;
    }

    const body = {
        "pedido": NumOrder,
        "estado": Estado,
        "statuss": Statuss
    }

    const url = '/cambiarEstado';

    api.post(url, body).then(resp => {

        response = {
            statusCode: 200,
            body: resp.data,
        };
        res.status(200).json(response);

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    });
}

controller.getPedidos = (req, res) => {
    const recurso = '/obtenerPedidos';
    api.get(recurso)
        .then(resp => {
            //const json = JSON.parse(resp.data.body);
            
            res.status(200).json({
                pedidos: resp.data.body
            });

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

module.exports = controller;