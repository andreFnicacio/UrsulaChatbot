const whatsappModel = require("../shared/whatsappmodels");
const updateClient = require("../util/api/updateClient");
//const startSession = require("../util/api/startSession");
const redis = require("../util/redis/redis_config");

async function flowSignUp(user,textUser) {
    // Se não existir, manda mensagem de despedida
    var models = [];
    textUser= textUser.toLowerCase();
    var state = await redis.getUserState(user.phone) || { step_flow: 'start' };


    //Check Awnser Client after end
    if (textUser === "await_session"){models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, user.phone)); return models;}
    else if (textUser === "session_flow"){ 
        //Registrando nova etapa
        state.flow_roadmap = textUser;     
        var responseToclient = "Vamos lá! Eu preciso que você faça a leitura do nosso *QrCode*\n\nRecomendamos abrir o *whatsapp web* para facilitar a leitura\nPronto, QrCode gerado!! Podemos encaminhar ?";
        const decision_tree = ["next_step", "await_session"];
        var button = whatsappModel.Button(responseToclient,user.phone,decision_tree);    

 
        const updateData = {"id_phone": user.phone, "updateData": state}; 
        const input = await updateClient(updateData);   
        console.log(input);

        models.push(button);           
    };    

    switch (state.step_flow) {
        case 'start':
            state.step_flow = 'ask_email';
            state.deadline = 120;            
            models.push(whatsappModel.MessageText("Por favor, diga-nos seu nome:", user.phone));
            break;

        case 'ask_email':
            state.name = textUser;
            state.step_flow = 'ask_uniquekey';
            models.push(whatsappModel.MessageText("Agora precisamos do seu email:", user.phone));
            break;

        case 'ask_uniquekey':
            state.email = textUser;
            state.step_flow = 'completed';
            models.push(whatsappModel.MessageText("Pra finalizar precisamos do cpf ou cnpj:", user.phone));
            break;     


        case 'completed':                              
            state.unique_key = textUser;               
            state.deadline = 86400;            
            state.step_flow ="finalized_signup";        

            var responseToclient = "Cadastro Realizado!😁\n\nVamos iniciar a sessão ?";
            const decision_tree = ["session_flow", "await_session"];
            var button = whatsappModel.Button(responseToclient,user.phone,decision_tree);    
            models.push(button);                
            break;                  
                
    }

    console.log("Objeto Redis: ", state);   
    if (state.step_flow === "finalized_signup") {
        const updateData = {"id_phone": user.phone, "updateData": state};
        const input = await updateClient(updateData);    
        state.step_flow = "next_flow";        
        console.log(input);            
    }    

    await redis.setUserState(user.phone, state); // Atualiza o estado no Redis
    return models;
}

module.exports = flowSignUp;
