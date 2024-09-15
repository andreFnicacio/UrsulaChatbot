
const whatsappService = require("../services/whatsappService");
const whatsappModel = require("../shared/whatsappmodels");
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Caminho para o arquivo JSON
const redisFilePath = path.join(__dirname, '../roadmap/redis.json');

function loadRedisJson() {
    try {
        const data = fs.readFileSync(redisFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Se o arquivo não existir ou der erro, retornamos um objeto vazio
        return {};
    }
}

function saveRedisJson(data) {
    fs.writeFileSync(redisFilePath, JSON.stringify(data, null, 2), 'utf8');
}    

async function flowDefault(number,user,textUser) {
    // Se não existir, manda mensagem de despedida
    var models = [];
    textUser = textUser.toLowerCase();
    let client = user['data'] || user;
    const user_id = client.id;
    const phone = number;
    const name = client.username; 
    const step = textUser;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const redisData = await loadRedisJson();

    const document_id = redisData[phone] || false;

    // Verifica se o document_id é válido e foi registrado
    if (document_id && uuidRegex.test(document_id)) {
        try {
            const response = await axios.post('https://educational-rag-production.up.railway.app/chat', null, {
                params: {
                    question: textUser,
                    document_id: document_id,
                    user_id: user_id
                },
                headers: {
                    'Content-Type': 'application/json' // Ajuste o cabeçalho se necessário
                }
            });
            console.log(response.data);
            const assistant = whatsappModel.MessageText(response['data'].content, phone)
            await whatsappService.SendMessageWhatsApp(assistant);
        } catch (error) {
            console.error("Erro ao fazer a requisição para a API: ", error);
        }
    }

    if (uuidRegex.test(step)) {
        try {
            // Carrega o conteúdo atual do JSON
            const redisData = loadRedisJson();

            // Atualiza ou adiciona o número do cliente com o document_id (step)
            redisData[phone] = step;

            // Salva o JSON atualizado de volta no arquivo
            saveRedisJson(redisData);

            console.log("Arquivo JSON atualizado com o IDDocument LastChat:", redisData);

            // Envia uma resposta de confirmação para o cliente
            models.push(whatsappModel.MessageText(`Perfeito ${name}!! Ja estou preparada pra te ajudar 😊. Do que você precisa hoje ?`, phone));
        } catch (error) {
            console.error("Erro ao salvar no arquivo JSON:", error);
            models.push(whatsappModel.MessageText("Erro ao salvar o Document ID. Tente novamente mais tarde.", phone));
        }
    }

    if (step == 'urs_assistant') {
        if (client.last_chats && client.last_chats.length > 0) {
            const lastFiveChats = client.last_chats.slice(-5);

            const rows = lastFiveChats.map(chat => {
                return {
                    id: chat.id,
                    title: "Testing",  
                    description: "Chat salvo pelo sistema FiveGuys"  
                }
            });

            console.log(rows);
            // Chamando a função listLastFiveChats com os dados montados
            const operationList = whatsappModel.listLastFiveChats(phone, rows);
            models.push(operationList);
        } else {
            await whatsappService.SendMessageWhatsApp(whatsappModel.MessageText("Opa, percebi que você ainda não tem um chat inciado\nAcesse nossa plataforma web para iniciar as anotações e liberar seu assistente ou se prefirir podemos iniciar por aqui tambem, gostaria de ver outras funções ? 😉", number));
            var operationList = whatsappModel.GetOutDoorData(phone); 
            models.push(operationList);
        }

        return models;
    }

    //IF PARA VERIFICAR SE RESPOSTA É UM UUID

    switch (step) {
        //CHAMDA DE BACKOFFICE
        case 'urs_backoffice':
            var operationList = whatsappModel.GetOutDoorBackoffice(phone); 
            models.push(operationList);
            break;    
        case 'urs_analist':            
            var operationList = whatsappModel.operationAgent(phone); 
            models.push(operationList);
            break;    
        case 'urs_faqs':
            var operationList = whatsappModel.OperationFAQ(phone); 
            models.push(operationList);
            break;   
        case 'urs_translate':
            models.push(whatsappModel.GetOutDoorData(number));             
            models.push(whatsappModel.MessageText("Opa! Estamos desenvolvendo essa função ainda!\nFique a vontade para consultar nossos produtos!", number));
            break;     
        case 'urs_who':
            models.push(whatsappModel.MessageText("Conheça Lian, nossa assistente digital avançada 🚀, treinada para ser sua educadora pessoal. Lian é especialista em analisar documentos e extrair informações cruciais, oferecendo suporte automatizado para otimizar a gestão dos seus contratos. Com ela, você tem à disposição uma ferramenta poderosa para facilitar seu dia a dia. 😉", number));
            break;  
        case 'urs_work':
            models.push(whatsappModel.MessageText("A mágica por trás da Lian é usar a Meta Cloud API, nossa própria API e uma conexão verificada com a OpenAI. Ela processa audios legíveis (a nível de computação) 🖥️, extrai os dados relevantes e responde de forma rápida e segura. 💡", number));
            break;   
        case 'urs_access':
            models.push(whatsappModel.MessageText("Você pode acessar a Lian pelo nosso portal online 🌐. Só fazer login e começar a usar os serviços da nossa assistente digital top! 😃", number));
            models.push(whatsappModel.GetOutDoorData(number));                                      
            break;                                                                      
        case 'urs_operation':
            var operationList = whatsappModel.OperationUrsula(phone); 
            models.push(operationList);
            break;           
        default:
            var textClient = `Olá ${name}, Bem vindo!! Gostaria de entrar no *menu* da sua sessão?`;
            const decision_tree_way = ["urs_operation", "await_session"];
            var button = whatsappModel.Button(textClient, phone, decision_tree_way);            
            models.push(button);    
            break;                                                      
            
    }
        
    return models;    
}

module.exports = flowDefault;
