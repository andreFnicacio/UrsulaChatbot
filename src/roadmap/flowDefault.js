const redis = require("../util/redis/redis_config");
const whatsappModel = require("../shared/whatsappmodels");
const sendTrigger = require("../util/api/sendTrigger");
const closeSession = require("../util/api/closeSession"); 
const deleteClient = require("../util/api/deleteClient"); 
const sendDocumentModel = require("../util/api/sendDocumentExample");
const updateClient = require("../util/api/updateClient");

async function flowDefault(user, textUser) {
    // Se não existir, manda mensagem de despedida
    var models = [];
    textUser = textUser.toLowerCase();
    const token = user.token;
    const phone = user.phone;
    const session = user.id_session;
    const name = user.name; 
    const step = user.step_flow === "disconnect" ? "disconnect" : textUser;

    var redisClient = await redis.getUserState(session);    

    if (textUser === "await_session"){
        redisClient.step_flow = "default"; 

        const updateData = {"id_phone": phone, "updateData": redisClient}; 
        await updateClient(updateData);   
        await redis.setUserState(session, redisClient);

        models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, phone)); 
        return models;
    }    

    switch (step) {
        //CHAMDA DE BACKOFFICE
        case 'urs_backoffice':
            var operationList = whatsappModel.GetOutDoorBackoffice(phone); 
            models.push(operationList);
            break; 
        case 'urs_analist':
            var operationList = whatsappModel.MessageText("Estamos finalizando essa integração 🤖",phone); 
            models.push(operationList);
            break;             
        case 'urs_operation':
            var operationList = whatsappModel.OperationUrsula(phone); 
            models.push(operationList);
            break;                            
        default:
            var textClient = `Olá ${user.name}, Bem vindo!! Gostaria de entrar no *menu* da sua sessão?`;
            const decision_tree_way = ["urs_operation", "await_session"];
            var button = whatsappModel.Button(textClient, phone, decision_tree_way);            
            models.push(button);    
            break;                                                      
            
    }
        
    return models;    
}

module.exports = flowDefault;
