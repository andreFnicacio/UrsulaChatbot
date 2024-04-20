const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");
const checkClientExists = require("../util/api/checkclient")

async function Process(textUser, number){
    textUser= textUser.toLowerCase();
    var models = [];

    const exists = await checkClientExists(number);
    // Se existir, manda mensagem de boas vindas
    if (exists) {
        var model = whatsappModel.MessageText("¡Hola y bienvenido de nuevo!", number);
    } else {
        // Se não existir, manda mensagem de despedida
        var model = whatsappModel.MessageText("Adiós 👋", number);
    }
    models.push(model);     

    models.forEach(model => {
        whatsappService.SendMessageWhatsApp(model);
    });
    


}

module.exports = {
    Process
};