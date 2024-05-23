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

    var token = user.token;
    const phone = user.phone;
    const session = user.id_session;
    const name  = user.name;     

    var stepFlow = user.step_flow;


   //Check Answer
    if (textUser === "await_session"){
        user.step_flow = "await_conect"; 

        const updateData = {"id_phone": phone, "updateData": user}; 
        await updateClient(updateData);   
        await redis.setUserState(session, user);

        models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, phone)); 
        return models;
    }
    else if (textUser === "repeat_qrcode"){ stepFlow = "generate_qrcode"}

    

    switch (stepFlow) {
        case 'generate_qrcode':
            const textSubmit = whatsappModel.MessageText(`Aguarde um momento, gerando *QRCODE* 🖖`, phone)
            whatsappService.SendMessageWhatsApp(textSubmit);  
            token = await generateToken(session);
            user.token = token;
            const qrcode = await generateQrcode(session,user,token);
            models.push(whatsappModel.QrCode(phone,qrcode));  

            var responseToclient = "Lembre de fazer a leitura utilizando seu *aplicativo oficial* do Whatsapp ✅\n\nPrecisa gerar um novo QrCode ? 😊";
            const decisions = ["repeat_qrcode", "await_session"];
            var button = whatsappModel.Button(responseToclient,phone,decisions);    
            models.push(button);            
            break;  

        case 'close_conect':
            var textClient = `Olá ${user.name}, tudo bem ?! Verifiquei no sistema e sua sessão foi desconectada!!\nGostaria de iniciar a sessão novamente ? 😁`;
            const close_tree_way = ["repeat_qrcode", "await_session"];
            var button = whatsappModel.Button(textClient,phone,close_tree_way);            
            models.push(button);    
            break;       

        default:     
            var textClient = `Olá ${user.name}, tudo bem ?! Verifiquei no sistema e sua sessão não está iniciada!!\nGostaria de iniciar a sessão agora ? 😁`;
            const decision_tree_way = ["repeat_qrcode", "await_session"];
            var button = whatsappModel.Button(textClient,phone,decision_tree_way);            
            models.push(button);    
            break;                                   
    }


    const updateData = {"id_phone": phone, "updateData": user};
    await updateClient(updateData);            

    await redis.setUserState(session, user);
    return models;
}

async function generateToken(session) {
    try {
        const response = await axios.post(`https://api-wpp-production.up.railway.app/api/${session}/THISISMYSECURETOKEN/generate-token`);

        return response.data.token;
    } catch (error) {
        console.error('Erro ao verificar cliente GENERATE TOKEN (GET_QRCODE): ', error);
        return false;
    }
}

module.exports = flowSession;
