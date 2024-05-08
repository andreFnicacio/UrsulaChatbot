const whatsappService = require("../services/whatsappService");
const whatsappModel = require("../shared/whatsappmodels");
const redis = require("../util/redis/redis_config");
const generateQrcode = require("../util/api/generateQrcode");
const axios = require('axios');

//Atualizando Infos do User
const updateClient = require("../util/api/updateClient");

async function flowSession(user,textUser) {
    var models = [];
    textUser= textUser.toLowerCase();

    const token = user.token;
    const phone = user.phone;
    const sessionClient = user.id_session;
    const name  = user.name;     
    
    var redisClient = await redis.getUserState(user.id_session) || {step_flow: false};
    var stepFlow = redisClient.step_flow || user.step_flow;


   //Check Answer
    if (textUser === "await_session"){
        redisClient.step_flow = "default"; 

        const updateData = {"id_phone": phone, "updateData": redisClient}; 
        await updateClient(updateData);   
        await redis.setUserState(sessionClient, redisClient);

        models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, phone)); 
        return models;
    }
    else if (textUser === "repeat_qrcode"){ stepFlow = "generate_qrcode"};

    const session = user.id_session;

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    

    switch (stepFlow) {
        case 'generate_qrcode':
            const textSubmit = whatsappModel.MessageText(`Aguarde um momento, gerando *QRCODE* 🖖`, phone)
            whatsappService.SendMessageWhatsApp(textSubmit);            
            const token = await generateToken(session);
            redisClient.token = token;            
            const qrcode = await generateQrcode(session,user,token);
            models.push(whatsappModel.QrCode(phone,qrcode));  

            var responseToclient = "Lembre de fazer a leitura utilizando seu *aplicativo oficial* do Whatsapp ✅\n\nPrecisa gerar um novo QrCode ? 😊";
            const decision_tree = ["repeat_qrcode", "await_session"];
            var button = whatsappModel.Button(responseToclient,phone,decision_tree);    
            models.push(button);            
            break;  

        default:
            redisClient.step_flow = 'generate_qrcode';            
            var textClient = `Olá ${user.name}, tudo bem ?! Verifiquei no sistema e sua sessão não está iniciada!!\nGostaria de iniciar a sessão agora ? 😁`;
            const decision_tree_way = ["generate_qrcode", "await_session"];
            var button = whatsappModel.Button(textClient,phone,decision_tree_way);            
            models.push(button);    
            break;                                   
    }


    const updateData = {"id_phone": phone, "updateData": redisClient};
    await updateClient(updateData);            

    await redis.setUserState(session, redisClient);
    return models;
}

async function generateToken(session) {
    try {
        const response = await axios.post(`http://localhost:21465/api/${session}/THISISMYSECURETOKEN/generate-token`);

        return response.data.token;
    } catch (error) {
        console.error('Erro ao verificar cliente GENERATE TOKEN (GET_QRCODE): ', error);
        return false;
    }
}

module.exports = flowSession;
