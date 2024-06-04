const redis = require("../util/redis/redis_config");
const whatsappModel = require("../shared/whatsappmodels");
const generateFixedQrCode = require("../controllers/generateFixedQrCode");
const updateClient = require("../util/api/updateClient");
const deleteLeads = require("../util/api/deleteLeads");
const importLeads = require('../util/api/importLeadsByBookList');

async function flowDefault(user,textUser) {
    // Se não existir, manda mensagem de despedida
    var models = [];
    textUser= textUser.toLowerCase();
    const token = user.token;
    const phone = user.phone;
    const session = user.id_session;
    const name  = user.name; 
    const step = textUser;

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
        case 'get_qrcodefixed':
            const qrcode = await generateFixedQrCode(session,phone);
            models.push(whatsappModel.QrCode(phone,qrcode));  

            models.push(whatsappModel.MessageText("Prontinho!! Agora é so pedir para seus contatos escanearem e nós cuidamos do resto!! :)", phone));
            break;  

        case 'get_docfile':
            models.push(whatsappModel.modelDoc(phone));    
            models.push(whatsappModel.MessageText("Estamos encaminhando uma planilha modelo! *Favor seguir a modelagem fornecida e nos encaminhar!", phone));
            break;     
            
        case 'delete_leads':
            await deleteLeads(session);
            models.push(whatsappModel.MessageText("Sua lista de contatos foi limpa!", phone));
            break;    
        
        case 'import_leads':
            await importLeads(session);
            models.push(whatsappModel.MessageText("Sua lista de contatos foi importada como Leads!!!", phone));
            break;                

        case 'retur_default':
            user.step_flow = "default_step";
            user.flow_roadmap = "default_flow";
    
            const updateData = {"id_phone": phone, "updateData": user};
    
            await updateClient(updateData);           
            await redis.setUserState(session, user);                   
    
            var operationList = whatsappModel.OperationDefault(session,phone); 
            models.push(operationList);  
            break              
        default:
            models.push(whatsappModel.MessageText("Bem-vindo novamente!! Escolha uma ação :D", phone));            
            var operationList = whatsappModel.OperationLeads(phone); 
            models.push(operationList); 
            break;                                                      
            
    }
    return models;    
}


module.exports = flowDefault;
