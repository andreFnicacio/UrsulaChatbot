const axios = require('axios');
async function startSession(session,token) {
    console.log("Iniciando seção");
    const url = `https://grantosegurosapimanagement-production.up.railway.app/api/${session}/start-session`;
    const postData = {
        webhook: "https://4e18-2804-1e68-c803-737-a827-64e0-a37c-2f88.ngrok-free.app/whatsapp/status",
        waitQrCode:true
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
            console.error('Erro de resposta do servidor START SESSION (GET_QRCODE): ', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Erro de requisição: ', error.request);
        } else {
            console.error('Erro ao configurar a requisição: ', error.message);
        }
        return false;
    }
}

module.exports = startSession;
