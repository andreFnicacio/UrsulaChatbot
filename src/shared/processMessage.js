const whatsappService = require("../services/whatsappService");
const checkClientExists = require("../util/api/checkclient");
const flowInitClient = require("../roadmap/flowInitClient");
const flowSignUp = require("../roadmap/flowSignUp");
const flowSession = require("../roadmap/flowSession");
const flowTrigger = require("../roadmap/flowTrigger");
const flowDefault = require("../roadmap/flowDefault");
const flowLeads = require("../roadmap/flowLeads");


async function Process(textUser, number){
    textUser = textUser.toLowerCase();

    const user = await checkClientExists(number);
    let models;

    if (user) {

        switch (user.flow_roadmap) {
            case 'trigger_flow':
                models = await flowTrigger(user,textUser);
                break;
            case 'session_flow':    
                models = await flowSession(user,textUser);
                break;
            case 'signup_flow':    
                models = await flowSignUp(user,textUser); // fluxo padrão se nenhum caso for correspondido
                break;    
            case 'leads_flow':    
                models = await flowLeads(user,textUser); // fluxo padrão se nenhum caso for correspondido
                break;                                
            default:
                models = await flowDefault(user,textUser);
        }
    } else {
        // models = await flowInitClient(number,textUser);
        models = await flowInitClient(number,textUser);
    }

    models.forEach(model => {
        whatsappService.SendMessageWhatsApp(model);
    });
    


}

module.exports = {
    Process
}