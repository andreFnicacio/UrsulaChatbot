const axios = require('axios');

async function checkClientExists(numberId) {
    try {
        const response = await axios.get(`http://localhost:21465/client/check?numberid=${numberId}`);
        return response.data.exists;
    } catch (error) {
        console.error('Erro ao verificar cliente: ', error);
        return false;
    }
}

module.exports = checkClientExists ;
