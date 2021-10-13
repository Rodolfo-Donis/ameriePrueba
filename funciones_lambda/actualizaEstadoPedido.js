const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event) => {
    const NoPedido = event.pedido;
    const Estado = event.estado;
    const Status = event.statuss;

    let response = {
        statusCode: 0,
        body: '',
    };

    if (Status === 'A') {
        await actualizaEstado(NoPedido, Estado).then(data => {
        }).catch(error => {
            //console.log("entra aqui ERROR " + error);
            return error.response;
        });

    } else {
        await actualizaEstadoYStatus(NoPedido, Estado, Status).then(data => {
            //console.log("\nJAJAD "+JSON.stringify(data));
        }).catch(error => {
            //console.log("entra aqui ERROR " + error);
            return error.response;
        });
    }

    response = {
        statusCode: 200,
        body: JSON.stringify('Exito'),
    };
    return response;

};

function actualizaEstado(NoPedido, Estado) {
    //console.log("\nJAJA "+NoPedido + " "+ Estado);
    const params = {
        TableName: "pedidos",
        Key: {
            "NumPedido": NoPedido
        },
        UpdateExpression: "set Estado = :estado",
        ExpressionAttributeValues: {
            ":estado": Estado
        },
        ReturnValues: "UPDATED_NEW"
    };

    return document.update(params).promise();
}

function actualizaEstadoYStatus(NoPedido, Estado, Status) {
    //console.log("\nJAJA "+NoPedido + " "+ Estado + " "+ Status);
    const params = {
        TableName: "pedidos",
        Key: {
            "NumPedido": NoPedido
        },
        UpdateExpression: "set Estado = :estado, EstPedido = :stat",
        ExpressionAttributeValues:{
            ":estado": Estado,
            ":stat": Status
        },
        ReturnValues: "UPDATED_NEW"
    };
    
    //console.log("\nJAJA "+JSON.stringify(params.ExpressionAttributeValues));

    return document.update(params).promise();
}