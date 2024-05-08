function MessageText(textResponse, number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,    
        "text": {
            "preview_url": true,
            "body": textResponse
        },
        "type": "text"
    });
    return data;
}

function QrCode(number,qrcode){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "image",
        "image": {
            "id": qrcode
        }
    });
    return data;    
}


function OperationDefault(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "✅ Opções"
            },
            "footer": {
                "text": "Selecione uma das opções."
            },
            "action": {
                "button": "Ver Opções",
                "sections": [
                    {
                        "title": "Campanhas ✉️",
                        "rows": [
                            {
                                "id": "send_campaign",
                                "title": "Disparar",
                                "description": "Disparar camapanha cadastrada."
                            },
                            {
                                "id": "input_models",
                                "title": "Modelos",
                                "description": "Inserir e administrar modelos cadastrados."
                            },
                            {
                                "id": "input_leads",
                                "title": "Leads",
                                "description": "Inserir e administrar contatos cadastrados."
                            }
                        ]
                    },
                    {
                        "title": "Conta ⚙️",
                        "rows": [
                            {
                                "id": "close_session",
                                "title": "Logout",
                                "description": "Sair da sessão ativa."
                            },
                        ]
                    }
                ]
            }
        }
    });
    return data;
}

function Button(text,number,decision_ids){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",  
        "interactive": {
            "type": "button",
            "body": {
                "text": text
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": decision_ids[0],
                            "title": "Sim"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": decision_ids[1],
                            "title": "Não"
                        }
                    }
                ]
            }
        }     
    });
    return data;
}

function MessageLocation(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "location",
        "location": {
        "latitude": "-12.067158831865067",
        "longitude": "-77.03377940839486",
        "name": "Estadio Nacional del Perú",
        "address": "C. José Díaz s/n, Cercado de Lima 15046"
    }
        
    });
    return data;
}

module.exports = {
MessageText,
OperationDefault,
Button,
QrCode,
MessageLocation
};