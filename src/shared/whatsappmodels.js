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

function modelDoc(number,qrcode){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "document",
        "document": {
            "link": "https://models4lead.s3.us-east-2.amazonaws.com/CRM+RAIZES.csv",
            "caption": "Planilha Modelo",
            "filename": "Modelo_Lista_Leads.csv"
        }
    });
    return data;    
}


function OperationLeads(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Leads ✉️"
            },
            "footer": {
                "text": "Selecione uma das opções."
            },
            "action": {
                "button": "Ver Opções",
                "sections": [
                    {
                        "title": "Gerenciar 🤖",
                        "rows": [
                            {
                                "id": "get_qrcodefixed",
                                "title": "QrCode 🤳",
                                "description": "Inserir clientes por qrcode."
                            },
                            {
                                "id": "get_docfile",
                                "title": "Planilha 📑",
                                "description": "Enviar modelo (excel/csv) de clientes."
                            },
                            {
                                "id": "import_leads",
                                "title": "Importar Contatos 📑",
                                "description": "Importar contatos como possiveis leads."
                            }                            
                        ]
                    },
                    {
                        "title": "Gerencia ⚙️",
                        "rows": [
                            {
                                "id": "retur_default",
                                "title": "Menu 🔙",
                                "description": "Retornar para menu principal."
                            },{
                                "id": "delete_leads",
                                "title": "Delete 🔴",
                                "description": "Deletar todos os leads."
                            }                            
                        ]
                    }
                ]
            }
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
                "text": "Menu de Operações "
            },
            "footer": {
                "text": "Selecione uma das opções."
            },
            "action": {
                "button": "Ver Opções",
                "sections": [
                    {
                        "title": "Ursulah 🤖",
                        "rows": [
                            {
                                "id": "send_campaign",
                                "title": "Analise Docs 📃",
                                "description": "Enviar documento para análise com a Ursulah."
                            },
                            {
                                "id": "last_models",
                                "title": "Documento recente 📑",
                                "description": "Exibir detalhes do ultimo contrato análisado."
                            },
                            {
                                "id": "get_leads",
                                "title": "Download planilha 📑",
                                "description": "Inserir e administrar contatos cadastrados."
                            }
                        ]
                    },
                    {
                        "title": "Backoffice ⚙️",
                        "rows": [
                            {
                                "id": "backoffice_account",
                                "title": "Acessar Backoffice 🪟",
                                "description": "Acessar backoffice Ursulah."
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

function GetOutDoorData(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "cta_url",
            "header": {
                "type": "text",
                "text": "Backoffice Ursulah"
            },
            "body": {
                "text": "Click no botão para acessar nossa plataforma."
            },
            "footer": {
                "text": "Backoffice"
            },
            "action": {
                "name": "cta_url",
                "parameters": {
                    "display_text": "Plataforma",
                    "url": "https://usrulah-granto.netlify.app/"
                }
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
OperationLeads,
Button,
QrCode,
MessageLocation,
modelDoc,
GetOutDoorData
};