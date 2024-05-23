const axios = require('axios');

async function getQrCode(session,token) {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            timeout: 50000 // timeout de 5 segundos
        };        
        const response = await axios.get(`https://api-wpp-production.up.railway.app/api/${session}/qrcode-session`,config);
        return response;
    } catch (error) {
        console.error('Erro ao verificar cliente: ', error);
        return false;
    }
}

module.exports = getQrCode;
