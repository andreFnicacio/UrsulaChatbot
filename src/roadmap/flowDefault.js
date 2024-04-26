const whatsappModel = require("../shared/whatsappmodels");

async function flowDefault(number,textUser) {
    // Se não existir, manda mensagem de despedida
    textUser= textUser.toLowerCase();
    var models = [];    

    var model = whatsappModel.MessageText("¡Hola y bienvenido de nuevo!", number); 
    models.push(model);          

    return models;
}

module.exports = flowDefault;
