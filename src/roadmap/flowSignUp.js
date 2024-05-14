const { text } = require("express");
const whatsappModel = require("../shared/whatsappmodels");
const updateClient = require("../util/api/updateClient");
//const startSession = require("../util/api/startSession");
const redis = require("../util/redis/redis_config");

function capitalizeWords(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

async function flowSignUp(user,textUser) {
    textUser = textUser.toLowerCase();

    const phoneClient = user.phone;
    const session = user.id_session
    
    var models = [];
    var stepFlow = user.step_flow;

    if (textUser === "await_session"){
        user.flow_roadmap = "session_flow"; 
        user.step_flow = "await_conect"; 

        const updateData = {"id_phone": user.phone, "updateData": user}; 
        await updateClient(updateData);   
        await redis.setUserState(session, user); // Atualiza o estado no Redis                

        models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, user.phone)); 
        return models;
    } 
    else if (textUser === "await_step"){
        user.step_flow = "default"; 

        const updateData = {"id_phone": user.phone, "updateData": user}; 
        await updateClient(updateData);           

        models.push(whatsappModel.MessageText(`Ok! Me chame novamento quando quiser!! 😊`, user.phone)); 
        return models;        
    }
    else if (textUser === "session_flow"){ 
        //Registrando nova etapa
        user.flow_roadmap = textUser;     

        var responseToclient = "Perfeito 🤖! Eu preciso que você faça a leitura do nosso *QrCode*\n\nRecomendamos abrir o *whatsapp web* para facilitar a leitura\n\nPronto, QrCode gerado!! Podemos encaminhar ?";
        const decision_tree = ["next_step", "await_session"];
        var button = whatsappModel.Button(responseToclient,user.phone,decision_tree);    

 
        const updateData = {"id_phone": user.phone, "updateData": user}; 
        await updateClient(updateData);   

        models.push(button);           
    };    


    switch (stepFlow) {
        case 'start':
            user.step_flow = 'ask_name'; // Ajustar o fluxo para perguntar o nome
            user.id_session = user.id_session;
            user.phone = user.phone;
            user.deadline = 300;
            models.push(whatsappModel.MessageText("Pra começar, me informe seu nome por favor!? 😊", phoneClient));
            break;
    
        case 'ask_name': // Novo caso para validar o nome
            if (isValidName(textUser)) {
                user.name = capitalizeWords(textUser);
                user.step_flow = 'validate_email';
                user.deadline = 300;                
                models.push(whatsappModel.MessageText(`Maravilha *${user.name}*! Agora preciso saber seu email.`, phoneClient));
            } else {
                models.push(whatsappModel.MessageText("O nome fornecido não é válido. Por favor, informe um nome sem caracteres especiais e com pelo menos 3 letras.", phoneClient));
            }
            break;

        case 'validate_email':
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(textUser)) {  // Verifica se o email é válido
                user.email = textUser;
                user.step_flow = 'validate_unique_key';
                models.push(whatsappModel.MessageText("Qual é o seu CPF ou CNPJ?", phoneClient));
            } else {  // Caso email inválido, pede novamente
                models.push(whatsappModel.MessageText("Parece que o email fornecido não é válido. Por favor, informe um email válido.", phoneClient));
            }
            break;            

        case 'validate_unique_key':
            // Expressão regular para validar CPF ou CNPJ
            const cpfCnpjRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;

            if (cpfCnpjRegex.test(textUser)) {
                user.unique_key = textUser;
                user.step_flow = 'finalized_signup';
                user.deadline = 86400;
                var responseToclient = "Seu cadastro já está *Realizado*! 😁\n\nVamos iniciar a sessão?";
                const decision_tree = ["session_flow", "await_session"];
                var button = whatsappModel.Button(responseToclient, phoneClient, decision_tree);
                models.push(button);
            } else {
                models.push(whatsappModel.MessageText("O CPF ou CNPJ fornecido não é válido. Por favor, informe um válido.", phoneClient));
            }
            break;
        
        case 'default':
            user.step_flow = 'start';
            user.deadline = 120;                      
            var textClient = "Eita! Parece que você não finalizou seu cadastro no sistema 😅.\nPodemos continuar agora ?";
            const decision_tree_way = ["signup_follow", "await_step"];
            var button = whatsappModel.Button(textClient,user.phone,decision_tree_way);            
            models.push(button);  
            await updateClient({"id_phone": phoneClient, "updateData": user});                        
            
            return models;                        
                
    }
 
    if (user.step_flow === "finalized_signup") {
        user.step_flow = "generate_qrcode";        
        const updateData = {"id_phone": phoneClient, "updateData": user};
        await updateClient(updateData);             
    }    

    await redis.setUserState(session, user); // Atualiza o estado no Redis
    return models;
}

function isValidName(name) {
    // Verifica se o nome tem pelo menos 3 letras e não contém os caracteres inválidos
    return /^[A-Za-zÀ-ÖØ-öø-ÿ ']{3,}$/.test(name) && !/[@]|\.com|\.br/.test(name);
}


module.exports = flowSignUp;
