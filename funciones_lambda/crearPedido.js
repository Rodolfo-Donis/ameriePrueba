const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event) => {
    const NoPedido = event.pedido;
    const Estado = event.estado;
    const status = event.statuss;
    const desc = event.desc;

    let response;

    await creaPedido(NoPedido, Estado, status, desc).then(data => {
        console.log("SIIIIII " + data.body);
    }).catch(error => {
        //console.log("entra aqui ERROR " + error);
        return error.response;
    });

    response = {
        statusCode: 200,
        body: JSON.stringify('Exito'),
    };
    return response;

};

function creaPedido(NoPedido, Estado, status, desc) {
    console.log("\nJAJA "+NoPedido + " "+ Estado + " "+ status + " "+ desc);
    const params = {
        TableName: "pedidos",
        Item: {
            "NumPedido": NoPedido,
            "Estado": Estado,
            "Status": status,
            "Descripcion": desc
        }
    };
    

    return document.put(params).promise();
}