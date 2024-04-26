const axios = require('axios');

async function startSession(numberId,waitQrCode,token) {
    const url = `http://localhost:21465/api/session_${numberId}/start-session`;
    const postData = {
        webhook: null,
        waitQrCode:waitQrCode
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 50000 // timeout de 5 segundos
    };

    try {
        const jsonPostData = JSON.stringify(postData);
        const response = await axios.post(url, jsonPostData, config);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erro de resposta do servidor START SESSION: ', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Erro de requisição: ', error.request);
        } else {
            console.error('Erro ao configurar a requisição: ', error.message);
        }
        return false;
    }
}

module.exports = startSession;
