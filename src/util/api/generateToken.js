const axios = require('axios');

async function generateToken(numberId) {
    try {
        const response = await axios.post(`https://grantosegurosapimanagement-production.up.railway.app/api/session_${numberId}/THISISMYSECURETOKEN/generate-token`);
        return response.data.token;
    } catch (error) {
        console.error('Erro ao verificar cliente: ', error);
        return false;
    }
}

module.exports = generateToken;
