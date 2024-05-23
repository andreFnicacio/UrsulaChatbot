const axios = require('axios');

async function deleteClient(session) {
    const url = `https://api-wpp-production.up.railway.app/api/${session}/deleteleads`; // URL atualizada para rota de update
    const postData = {
        sessionId: session
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
            //'Authorization': `Bearer ${token}`
        },
        timeout: 5000 // timeout de 5 segundos (5000 milissegundos)
    };

    try {
        const jsonPostData = JSON.stringify(postData);        
        const response = await axios.post(url, jsonPostData, config); // postData já é um objeto, então não precisa de JSON.stringify
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erro de resposta do servidor UPDATE: ', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Erro de requisição: ', error.request);
        } else {
            console.error('Erro ao configurar a requisição: ', error.message);
        }
        return false;
    }
}

module.exports = deleteClient; // Nome da função atualizado para refletir a ação
