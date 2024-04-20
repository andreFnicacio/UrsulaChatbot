const axios = require('axios');

async function checkClientExists(numberId) {
    try {
        const response = await axios.get(`http://api-wpp-production.up.railway.app/api/session_${numberId}/client/check`, {
            params: { numberid: numberId }
        });
        return response.data.exists;
    } catch (error) {
        console.error('Erro ao verificar cliente: ', error);
        return false;
    }
}

module.exports = checkClientExists ;
