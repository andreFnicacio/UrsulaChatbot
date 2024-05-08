const whatsappModel = require("../shared/whatsappmodels");
const redis = require("../util/redis/redis_config");
const sendTrigger = require("../util/api/sendTrigger");
const updateClient = require("../util/api/updateClient");

async function flowTrigger(user,textUser) {
    var models = [];
    const token = user.token;
    const phone = user.phone;
    const session = user.id_session;
    const name  = user.name;
    textUser= textUser.toLowerCase();
   //Check Answer
    if (textUser === "await_session"){models.push(whatsappModel.MessageText(`Ok ${name}! Me chame novamente quando quiser testar!! 😊`, phone)); return models;}

    //Pegando sessão
    let state = await redis.getUserState(session) || { step_flow: 'default_step' };

    switch (state.step_flow) {
        case 'default_step':
            state.flow_roadmap = "default";
            await sendTrigger(session,token);
            models.push(whatsappModel.MessageText(`Ok ${name}! Disparo efetuado, em breve vamos disponibilizar nossos serviços para casos reais. 😊`, phone));
            break;  
    }

    const updateData = {"id_phone": phone, "updateData": state};
    await updateClient(updateData); 
    await redis.setUserState(session, state); // Atualiza o estado no Redis
    return models;
}

module.exports = flowTrigger;
