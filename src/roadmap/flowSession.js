const whatsappModel = require("../shared/whatsappmodels");
const redis = require("../util/redis/redis_config");
const generateQrcode = require("../util/api/generateQrcode");
const checkConnectionSession = require("../util/api/checkStatusSession");

async function flowSession(user,textUser) {
    var models = [];
    textUser= textUser.toLowerCase();
   //Check Answer
    if (textUser === "await_session"){models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando estiver pronto!! 😊`, user.phone)); return models;}

    //Pegando sessão
    const session = user.id_session;
    let state = await redis.getUserState(user.phone) || { step_flow: 'start' };

    switch (state.step_flow) {
        case 'next_flow':
            const qrcode = await generateQrcode(session,user);
            models.push(whatsappModel.QrCode(user.phone,qrcode));          

            var responseToclient = "Lemnbre de fazer a leitura utilizando seu *aplicativo oficial* do whatsapp\nLeitura de QrCode confirmada ? 😊";
            const decision_tree = ["next_step", "await_session"];
            var button = whatsappModel.Button(responseToclient,user.phone,decision_tree);    
            state.step_flow = "check_conection";
            models.push(button);
            break;  
        
        case 'check_conection':
            const check_conection = checkConnectionSession(session,user.token);
    }


    await redis.setUserState(user.phone, state); // Atualiza o estado no Redis
    return models;
}

module.exports = flowSession;
