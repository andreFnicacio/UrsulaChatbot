const axios = require('axios');

async function closeSession(session, token) {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Assegure-se de que este cabeçalho está definido, especialmente se esperado pelo servidor.
            }
        };
        // Se espera enviar dados na requisição, você deve incluir um objeto vazio ou os dados reais como segundo parâmetro antes de `config`.
        const response = await axios.post(`https://api-wpp-production-d36f.up.railway.app/api/${session}/logout-session`, {}, config);
        console.log("Close Data:",response.data);        
        return response.data;
    } catch (error) {
        console.error('Erro ao fechar sessão: ', error);
        return false;
    }
}

module.exports = closeSession;