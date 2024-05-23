const axios = require('axios');

async function updateClient(clientData) {
    const url = 'https://api-wpp-production.up.railway.app/client/update'; // URL atualizada para rota de update
    const postData = {
        numberId: clientData.id_phone, // Presume-se que este seja o identificador único do cliente
        updateData: clientData.updateData
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer' // Se necessário
        },
        timeout: 5000 // timeout de 5 segundos (5000 milissegundos)
    };

    try {
        const response = await axios.put(url, postData, config); // postData já é um objeto, então não precisa de JSON.stringify
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

module.exports = updateClient; // Nome da função atualizado para refletir a ação
