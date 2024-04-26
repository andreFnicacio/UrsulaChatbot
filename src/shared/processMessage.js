const whatsappService = require("../services/whatsappService");
const checkClientExists = require("../util/api/checkclient");
const flowInitClient = require("../roadmap/flowInitClient");
const flowSignUp = require("../roadmap/flowSignUp");
const flowSession = require("../roadmap/flowSession");


async function Process(textUser, number){
    textUser = textUser.toLowerCase();

    const exists = await checkClientExists(number);
    let models;

    if (exists) {
        switch (exists.flow_roadmap) {
            case 'trigger_follow':
                console.log('Read to send Messages');
                break;
            case 'session_flow':    
                models = await flowSession(exists,textUser);
                break;
            default:
                models = await flowSignUp(exists,textUser); // fluxo padrão se nenhum caso for correspondido
        }
    } else {
        models = await flowInitClient(number,textUser);
    }

    models.forEach(model => {
        whatsappService.SendMessageWhatsApp(model);
    });
    


}

module.exports = {
    Process
}