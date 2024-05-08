const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");
const updateClient = require("../util/api/updateClient");

const inputLeads = require("../util/api/inputLeads");
var redis = require("../util/redis/redis_config");

async function status(req, res){    
    const status = req.body.status;
    const type = req.body.type;
    const sessionClient = req.body.session;        
    //PEGAR DADOS DO USUARIO: PHONE, SESSION, TOKEN

    if (status === "qrReadError"){        
        var redisClient = await redis.getUserState(sessionClient);

        var textClient = `Oii ${redisClient.name}, tudo bem?! Tivemos um problema na hora da leitura do Qr Code 🥺!\nGostaria de tentar novamente ?`;
        const decision_tree_way = ["generate_qrcode", "await_session"];
        var button = whatsappModel.Button(textClient,redisClient.phone,decision_tree_way);            

        whatsappService.SendMessageWhatsApp(button);       
    }else if(status === "inChat"){
        var redisClient = await redis.getUserState(sessionClient);
        
        redisClient.step_flow = "default_step";
        redisClient.flow_roadmap = "default_flow";

        await inputLeads(sessionClient,redisClient.token);        
        const updateData = {"id_phone": redisClient.phone, "updateData": redisClient};

        await updateClient(updateData);           
        await redis.setUserState(sessionClient, redisClient);                   

        var operationList = whatsappModel.OperationDefault(redisClient.phone); 
        whatsappService.SendMessageWhatsApp(operationList);    
             
    }else if(status === "desconnectedMobile"){
        var redisClient = await redis.getUserState(sessionClient);

        redisClient.step_flow = 'generate_qrcode';   
        redisClient.flow_roadmap = "session_flow";                 

        await inputLeads(sessionClient,redisClient.token);        
        const updateData = {"id_phone": redisClient.phone, "updateData": redisClient};

        await updateClient(updateData);           
        await redis.setUserState(sessionClient, redisClient);                   

        var textClient = `Opá ${user.name}, tudo certo?! O sistema me alertou que sua conexão foi encerrada 🥺!!\n\nGostaria de iniciar a sessão novamente ?`;
        const decision_tree_way = ["start_session", "await_session"];
        var button = whatsappModel.Button(textClient,user.phone,decision_tree_way);                      
        whatsappService.SendMessageWhatsApp(button);         
    }
        
}

module.exports = {status}
