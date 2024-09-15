const axios = require('axios');
const redis = require("../redis/redis_config");
const checkConnectionSession = require("../api/checkStatusSession");
const closeSession = require("../api/closeSession");
const updateClient = require("../api/updateClient");

async function checkClientExists(numberId) {
    try {
        const sessionKey = `session_${numberId}`;                
        
        // Tenta pegar o cliente do Redis primeiro
        let client = false//await redis.getUserState(sessionKey);

        // Limpa espaços e apóstrofos no número
        let cleanedNumberId = numberId.replace(/['\s]/g, '');
        let url = `https://fiveguysinthebike.online/api/v1/verify_user?phone=${cleanedNumberId}`;
        
        // Se não achou no Redis, faz a requisição no banco de dados
        if (!client) {
            const response = await axios.get(url);

            console.log("Retorno do banco de dados", response.data)

            if (response && response.data) {
                client = response.data;
                
                // Definir o tempo de expiração para o Redis (1 dia = 86400 segundos)
                client.deadline = 86400; 
                
                // Salva os dados do cliente no Redis
                await redis.setUserState(sessionKey, client);
                
                console.log("Cliente encontrado no banco, salvo no Redis:", client);
                return client;
            }
            return false;  // Se não encontrou no banco
        }

        // Cliente encontrado no Redis
        console.log("Cliente encontrado no Redis:", client);
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

async function handleInactiveSession(client, sessionKey) {
    if (client.flow_roadmap !== "session_flow") {
        client.flow_roadmap = "session_flow";
        client.step_flow = "await_conect";
        client.deadline = 86400;
        
        // Atualiza o cliente no banco de dados
        await updateClient({ "id_phone": client.phone, "updateData": client });
        return client;
    } else {
        return client;
    }
}

module.exports = checkClientExists;