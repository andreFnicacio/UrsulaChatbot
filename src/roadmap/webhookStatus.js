const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");
const updateClient = require("../util/api/updateClient");
const closeSession = require("../util/api/closeSession"); 

const inputLeads = require("../util/api/inputLeads");
var redis = require("../util/redis/redis_config");

async function status(req, res){    
    const status = req.body.status;
    const type = req.body.type;
    const session = req.body.session;     
    var redisClient = await redis.getUserState(session);
    console.log(status);

    if (status === "qrReadError" && !type){        
        var textClient = `Oii ${redisClient.name}, tudo bem?! Tivemos um problema na hora da leitura do Qr Code 🥺!\nGostaria de tentar novamente ?`;
        const decision_tree_way = ["generate_qrcode", "await_session"];
        var button = whatsappModel.Button(textClient,redisClient.phone,decision_tree_way);            

        whatsappService.SendMessageWhatsApp(button);       
    }else if(status === "inChat"  && !type){        
        redisClient.step_flow = "default_step";
        redisClient.flow_roadmap = "default_flow";

        await inputLeads(session,redisClient.token);        
        const updateData = {"id_phone": redisClient.phone, "updateData": redisClient};

        await updateClient(updateData);           
        await redis.setUserState(session, redisClient);                   

        var operationList = whatsappModel.OperationDefault(redisClient.phone); 
        whatsappService.SendMessageWhatsApp(operationList);    
             
    }else if(status === "browserClose"  && !type){
        const close = await closeSession(redisClient.id_session,redisClient.token);                    
        console.log(close);
        
        redisClient.flow_roadmap = "session_flow"; 
        redisClient.step_flow = "close_conect"; 
        redisClient.deadline = 86400;  

        const updateData = {"id_phone": redisClient.phone, "updateData": redisClient}; 
        await updateClient(updateData);                       

        await redis.setUserState(session, redisClient);           

        const textSubmit = whatsappModel.MessageText(`Sua conta foi deconectada 🥺. Mas fique tranquilo, sempre que quiser se conectar novamente conosco pode me chamar!! Fique bem 🥰!!`, redisClient.phone)
        whatsappService.SendMessageWhatsApp(textSubmit);              
    }
        
}

module.exports = {status}
