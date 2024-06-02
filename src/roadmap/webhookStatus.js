const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");
const updateClient = require("../util/api/updateClient");
const clearDataSession = require("../util/api/clearDataSession");
 
var redis = require("../util/redis/redis_config");

async function status(req, res){    
    const status = req.body.status;
    const type = req.body.type;
    const session = req.body.session;     
    var user = await redis.getUserState(session);
    const phone = user.phone;
    const token = user.token;

    if (type === "text/csv"){
        const textSubmit = whatsappModel.MessageText(`Lista de Leads Cadastrados!! Ja está disponivel para o disparo de campanhas 🥰`, phone)
        whatsappService.SendMessageWhatsApp(textSubmit);                      
    }

    if (status === "qrReadError" && !type){        
        var textClient = `Oii ${user.name}, tudo bem?! Tivemos um problema na hora da leitura do Qr Code 🥺!\nGostaria de tentar novamente ?`;
        const decision_tree_way = ["generate_qrcode", "await_session"];
        var button = whatsappModel.Button(textClient,phone,decision_tree_way);            

        whatsappService.SendMessageWhatsApp(button);       
    }else if(status === "inChat"  && !type && !user.session_status){        
        user.step_flow = "default_step";
        user.flow_roadmap = "default_flow";
        user.session_status = true;

        //await inputLeads(session,token);        
        const updateData = {"id_phone": phone, "updateData": user};

        await updateClient(updateData);           
        await redis.setUserState(session, user);                   

        var operationList = whatsappModel.OperationDefault(phone); 
        whatsappService.SendMessageWhatsApp(operationList);    
             
    }else if(status === "browserClose"  && !type){

        await clearDataSession(session,token);
        
        user.flow_roadmap = "session_flow"; 
        user.step_flow = "await_conect"; 
        user.session_status = false;        
        user.deadline = 86400;  

        const updateData = {"id_phone": phone, "updateData": user}; 
        await updateClient(updateData);                       

        await redis.setUserState(session, user);           

        const textSubmit = whatsappModel.MessageText(`Sua conta foi deconectada 🥺. Mas fique tranquilo, sempre que quiser se conectar novamente conosco pode me chamar!! Fique bem 🥰!!`, phone)
        whatsappService.SendMessageWhatsApp(textSubmit);              
    }
        
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedFunction() {
    console.log("Iniciando a função...");
    await sleep(4000); // Pausa por 4 segundos
    console.log("Executando após 4 segundos!");
}

module.exports = {status}
