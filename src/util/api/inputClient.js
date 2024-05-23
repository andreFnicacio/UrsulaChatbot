const axios = require('axios');
const redis = require("../redis/redis_config");

async function inputClient(clientData) {
    const url = 'https://api-wpp-production.up.railway.app/client/input';
    const postData = {        
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        unique_key: clientData.unique_key,
        id_session: clientData.id_session,
        id_phone: clientData.id_phone,
        flow_roadmap: clientData.flow_roadmap,
        step_flow: clientData.step_flow
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer' // Se necessário
        },
        timeout: 50000 // timeout de 5 segundos
    };

    try {
        const jsonPostData = JSON.stringify(postData);
        const response = await axios.post(url, jsonPostData, config);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erro de resposta do servidor INPUT CLIENT: ', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Erro de requisição: ', error.request);
        } else {
            console.error('Erro ao configurar a requisição: ', error.message);
        }
        return false;
    }
}

module.exports = inputClient;
