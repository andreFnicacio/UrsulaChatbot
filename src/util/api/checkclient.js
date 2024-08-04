const axios = require('axios');
const redis = require("../redis/redis_config");
const checkConnectionSession = require("../api/checkStatusSession");
const closeSession = require("../api/closeSession");
const updateClient = require("../api/updateClient");

async function checkClientExists(numberId) {
    console.log("Iniciando Checagem");
    try {
        const sessionKey = `session_${numberId}`;                
        let client = await redis.getUserState(sessionKey);

        if (!client) {
            console.log("Client Redis not found");            
            const response = await axios.get(`https://grantosegurosapimanagement-production.up.railway.app/users?phone=${numberId}`);
            console.log(response);
            if (response.phone) {
                client = response;
                client.deadline = 86400;                
            } else {
                return false;
            }
        }
        console.log("Client:", client);
        return client;
    } catch (error) {
        console.error('Erro ao verificar cliente: ', error);
        return false;
    }
}

async function isSessionActive(client) {
    const status = await checkConnectionSession(client.id_session, client.token);
    return status;
}

//async function updateClientSession(client, sessionKey, deadline) {
//    client.deadline = deadline;
//    await redis.setUserState(sessionKey, client);
//}

async function handleInactiveSession(client, sessionKey) {
    if (client.flow_roadmap !== "session_flow") {
        client.flow_roadmap = "session_flow";
        client.step_flow = "await_conect";
        client.deadline = 86400;
        await updateClient({"id_phone": client.phone, "updateData": client});
        return client;
    }else{
        return client;
    }
}

module.exports = checkClientExists;
