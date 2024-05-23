const axios = require('axios');

async function checkConnectionSession(session,token) {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            timeout: 50000 // timeout de 5 segundos
        };        
        const response = await axios.get(`https://api-wpp-production.up.railway.app/api/${session}/check-connection-session`,config);
        return response.data.status;
    } catch (error) {
        console.error('Erro ao verificar cliente: ', error);
        return false;
    }
}

module.exports = checkConnectionSession;
