const axios = require('axios');

async function logoutSession(session, token) {
    try {
        console.log(session, token);
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Assegure-se de que este cabeçalho está definido, especialmente se esperado pelo servidor.
            }
        };
        // Se espera enviar dados na requisição, você deve incluir um objeto vazio ou os dados reais como segundo parâmetro antes de `config`.
        const response = await axios.post(`http://localhost:21465/api/${session}/close-session`, {}, config);
        return response.data;
    } catch (error) {
        console.error('Erro ao fechar sessão: ', error);
        return false;
    }
}

module.exports = logoutSession;