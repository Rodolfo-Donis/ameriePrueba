const AWS = require("aws-sdk");
const { Console } = require("console");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event, callback) => {
    let result = {
        datos: "",
        url: ""
    };
    let catalogo = [];
    let imagenn;
    let todoCatalogo = [];

    await readProducts().then(data => {
        data.Items.forEach(element => {
            console.log(element);
            catalogo.push(element);
        });

    }).catch((err) => {
        console.error(err);

        const response = {
            statusCode: 500,
            body: err,
        };

        return response;
    });

    let i = 0;
    //console.log("\nJAJA: "+JSON.parse(JSON.stringify(catalogo[0])).imagen.split(",")[0]);
    for (i = 0; i < catalogo.length; i++) {
        var info = JSON.parse(JSON.stringify(catalogo[0])).imagen.split(",");
        console.log("\nIMAGEN: ", info);

        await readImages(info[0], info[1]).then(data => {
            data.Items.forEach(imagen => {
                console.log(imagen);
                imagenn = imagen.URL;
            });

        }).catch((err) => {
            console.error(err);

            const response = {
                statusCode: 500,
                body: err,
            };
            return response;
        });

        result = {
            datos: catalogo[i],
            url: imagenn
        };

        console.log("\nRESULTADO: " + result.datos);
        console.log("\nRESULTADO: " + result.url);

        todoCatalogo.push(result);
    }


    const response = {
        statusCode: 200,
        body: JSON.stringify(todoCatalogo)
    };

    return response;
};

function readProducts() {
    const params = {
        TableName: "catalogo"
    };

    return document.scan(params).promise();
}

function readImages(tipo, titulo) {
    const params = {
        TableName: "imagenes",
        FilterExpression: "Tipo = :tipo AND Titulo = :titulo",
        ExpressionAttributeValues: {
            ":tipo": tipo,
            ":titulo": titulo
        }
    };

    return document.scan(params).promise();
}