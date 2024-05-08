const { text } = require("express");
const whatsappModel = require("../shared/whatsappmodels");
const updateClient = require("../util/api/updateClient");
//const startSession = require("../util/api/startSession");
const redis = require("../util/redis/redis_config");

function capitalizeWords(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

async function flowSignUp(user,textUser) {
    // Se não existir, manda mensagem de despedida
    const phoneClient = user.phone;
    const sessionClient = user.id_session
    var models = [];
    textUser= textUser.toLowerCase();
    var redisClient = await redis.getUserState(sessionClient) || {step_flow: false};
    var stepFlow = redisClient.step_flow || user.step_flow;

    //Check Awnser Client after end
    if (textUser === "await_session"){
        redisClient.flow_roadmap = "session_flow"; 
        redisClient.step_flow = "await_conect"; 

        const updateData = {"id_phone": user.phone, "updateData": redisClient}; 
        await updateClient(updateData);   
        await redis.setUserState(sessionClient, redisClient); // Atualiza o estado no Redis                

        models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, user.phone)); 
        return models;
    } 
    else if (textUser === "await_follow"){
        redisClient.step_flow = "default"; 

        const updateData = {"id_phone": user.phone, "updateData": redisClient}; 
        await updateClient(updateData);           

        models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, user.phone)); 
        return models;        
    }
    else if (textUser === "session_flow"){ 
        //Registrando nova etapa
        redisClient.flow_roadmap = textUser;     
        redisClient.step_flow = "generate_qrcode";

        var responseToclient = "Perfeito 🤖! Eu preciso que você faça a leitura do nosso *QrCode*\n\nRecomendamos abrir o *whatsapp web* para facilitar a leitura\n\nPronto, QrCode gerado!! Podemos encaminhar ?";
        const decision_tree = ["next_step", "await_session"];
        var button = whatsappModel.Button(responseToclient,user.phone,decision_tree);    

 
        const updateData = {"id_phone": user.phone, "updateData": redisClient}; 
        await updateClient(updateData);   

        models.push(button);           
    };    


    switch (stepFlow) {
        case 'start':
            redisClient.step_flow = 'default';            
            const updateData = {"id_phone": user.phone, "updateData": redisClient};
            await updateClient(updateData); 

            redisClient.step_flow = 'ask_email';
            redisClient.id_session = user.id_session;
            redisClient.phone = user.phone;
            redisClient.deadline = 300;            
            models.push(whatsappModel.MessageText("Pra começar, me informe seu nome por favor!? 😊", phoneClient));
            break;

        case 'ask_email':
            redisClient.name = capitalizeWords(textUser);
            redisClient.step_flow = 'validate_email';
            redisClient.deadline = 300;
            models.push(whatsappModel.MessageText(`Maravilha *${redisClient.name}*! Agora preciso saber seu email.`, phoneClient));
            break;

        case 'validate_email':
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(textUser)) {  // Verifica se o email é válido
                redisClient.email = textUser;
                redisClient.step_flow = 'validate_unique_key';
                models.push(whatsappModel.MessageText("Qual é o seu CPF ou CNPJ?", phoneClient));
            } else {  // Caso email inválido, pede novamente
                models.push(whatsappModel.MessageText("Parece que o email fornecido não é válido. Por favor, informe um email válido.", phoneClient));
            }
            break;            

        case 'validate_unique_key':
            // Expressão regular para validar CPF ou CNPJ
            const cpfCnpjRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;

            if (cpfCnpjRegex.test(textUser)) {
                redisClient.unique_key = textUser;
                redisClient.step_flow = 'finalized_signup';
                redisClient.deadline = 86400;
                var responseToclient = "Seu cadastro já está *Realizado*! 😁\n\nVamos iniciar a sessão?";
                const decision_tree = ["session_flow", "await_session"];
                var button = whatsappModel.Button(responseToclient, phoneClient, decision_tree);
                models.push(button);
            } else {
                models.push(whatsappModel.MessageText("O CPF ou CNPJ fornecido não é válido. Por favor, informe um válido.", phoneClient));
            }
            break;
        
        case 'default':
            redisClient.step_flow = 'start';
            redisClient.deadline = 120;                      
            var textClient = "Eita! Parece que você não finalizou seu cadastro no sistema 😅.\nPodemos continuar agora ?";
            const decision_tree_way = ["signup_follow", "await_follow"];
            var button = whatsappModel.Button(textClient,user.phone,decision_tree_way);            
            models.push(button);  
            await updateClient({"id_phone": phoneClient, "updateData": redisClient});                        
            
            return models;                        
                
    }
 
    if (redisClient.step_flow === "finalized_signup") {
        redisClient.step_flow = "completed";        
        const updateData = {"id_phone": phoneClient, "updateData": redisClient};
        await updateClient(updateData);            
        redisClient.step_flow = "generate_qrcode";        
    }    

    await redis.setUserState(sessionClient, redisClient); // Atualiza o estado no Redis
    return models;
}

module.exports = flowSignUp;
