const bcrypt = require('bcrypt');

const helpers = {}

helpers.encryptPassword = (contra) => {
    const salt = bcrypt.genSaltSync(10);
    const encripada = bcrypt.hashSync(contra, salt);
    return encripada;
}

helpers.comparaPassword = (contraActual, contraBd) => {
    return bcrypt.compareSync(contraActual, contraBd);
}

helpers.direccionApi = () => {
    return "https://82eqkj0ybl.execute-api.us-east-2.amazonaws.com/amariePostres";
}

module.exports = helpers;