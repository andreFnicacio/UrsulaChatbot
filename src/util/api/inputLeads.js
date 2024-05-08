const axios = require('axios');

async function inputLeads(session,token) {
    console.log("START INPUT LEADS");
    const url = `http://localhost:21465/api/${session}/inputleads`;
    const postData = {
        categorie: "default",
        lead: [
          {
            nome: "Andre",
            telefone: "27996288611",
            primeiro_contato: "30/01/2024",
            ultimo_contato: "12/03/2024",
            anotacoes: "CONTATO FEITO POR WPP. BRINDES ENVIADOS",
            categorie: "developer"
          },
          {
            nome: "Dyone",
            telefone: "27997413242",
            primeiro_contato: "30/01/2024",
            ultimo_contato: "12/03/2024",
            anotacoes: "CONTATO FEITO POR WPP. BRINDES ENVIADOS"
          }
        ]
      }
      ;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Se necessário
        },
        timeout: 50000 // timeout de 5 segundos
    };

    try {
        const jsonPostData = JSON.stringify(postData);
        const response = await axios.post(url, jsonPostData, config);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erro de resposta do servidor INPUT CLIENT: ', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Erro de requisição: ', error.request);
        } else {
            console.error('Erro ao configurar a requisição: ', error.message);
        }
        return false;
    }
}

module.exports = inputLeads;
