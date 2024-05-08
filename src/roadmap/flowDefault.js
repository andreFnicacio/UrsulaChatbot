const redis = require("../util/redis/redis_config");
const whatsappModel = require("../shared/whatsappmodels");
const sendTrigger = require("../util/api/sendTrigger");
const closeSession = require("../util/api/closeSession"); 
const startSession = require("../util/api/startSession"); 
const sendDocumentModel = require("../util/api/sendDocumentExample");
const updateClient = require("../util/api/updateClient");

async function flowDefault(user,textUser) {
    // Se não existir, manda mensagem de despedida
    var models = [];
    textUser= textUser.toLowerCase();
    const token = user.token;
    const phone = user.phone;
    const session = user.id_session;
    const name  = user.name; 
    const step = user.step_flow === "disconnect" ? "disconnect" : textUser;

    var redisClient = await redis.getUserState(session);    

    if (textUser === "await_session"){
        redisClient.step_flow = "default"; 

        const updateData = {"id_phone": user.phone, "updateData": redisClient}; 
        await updateClient(updateData);   
        await redis.setUserState(session, redisClient);

        models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, user.phone)); 
        return models;
    }    

    switch (step) {
        case 'send_campaign':
            const returnCampaign = await sendTrigger(session,token);
            console.log("Enviar disparo de campanha: ",returnCampaign);
            models.push(whatsappModel.MessageText(`Perfeito ${name}! Disparo efetuado com sucesso para a lista de contatos. 😊`, phone));                                      
            break;          
        case 'input_models':     
            models.push(whatsappModel.MessageText(`Eita! Essa operação está em desenvolvimento 😎`, phone));                                      
            break;              
        case 'input_leads':
            models.push(whatsappModel.MessageText(`Otimo! Preciso que me envie um arquivo *csv* seguindo o modelo enviado.`, phone));                                      
            await sendDocumentModel(phone);
            break;                
        case 'await_session':
            models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, user.phone));             
            break;    
        case 'close_session':     
            const close = await closeSession(session,token); 
            console.log("Close Session", close);

            redisClient.step_flow = "disconnect"; 

            const updateData = {"id_phone": user.phone, "updateData": redisClient}; 
            await updateClient(updateData);   
            await redis.setUserState(session, redisClient);            
            
            models.push(whatsappModel.MessageText(`Sua sessão foi desativada.`, user.phone));             
            break;    
        case 'disconnect':      
            redisClient.step_flow = 'default_step';     
            const updateSession = {"id_phone": user.phone, "updateData": redisClient}; 
            await updateClient(updateSession);   
            await redis.setUserState(session, redisClient);            

            var textClient = `Olá ${user.name}, tudo bem ?! Verifiquei no sistema e sua sessão foi encerrada!!\nGostaria de iniciar a sessão agora ? 😁`;
            var button = whatsappModel.Button(textClient,phone,["connect", "await_session"]);            
            models.push(button);    
            break;       
        case 'connect':   
            const connect = await startSession(session,token);
            console.log(connect);

            var textClient = `Perfeito ${user.name}, conectado novamente!! Gostária de entrar na *menu* da sua sessão ?`;
            var button = whatsappModel.Button(textClient,user.phone,["default_operation", "await_session"]);            
            models.push(button);                          

        case 'default_operation':
            var operationList = whatsappModel.OperationDefault(user.phone); 
            models.push(operationList);
            break;                
        default:
            var textClient = `Olá ${user.name}, Bem vindo novamente!! Gostária de entrar na *menu* da sua sessão ?`;
            const decision_tree_way = ["default_operation", "await_session"];
            var button = whatsappModel.Button(textClient,user.phone,decision_tree_way);            
            models.push(button);    
            break;                                                      
            
    }
    return models;    
}


module.exports = flowDefault;
