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
                "text": "Menu de Operações ✅"
            },
            "footer": {
                "text": "Selecione uma das opções."
            },
            "action": {
                "button": "Ver Opções",
                "sections": [
                    {
                        "title": "Ursula",
                        "rows": [
                            {
                                "id": "send_doc",
                                "title": "Análise",
                                "description": "Enviar contrato para análise."
                            }
                        ]
                    },
                    {
                        "title": "Conta ⚙️",
                        "rows": [
                            {
                                "id": "access_backoffice",
                                "title": "Backoffice",
                                "description": "Acessar backoffice."
                            }                            
                        ]
                    }
                ]
            }
        }
    });
    return data;
}

function OperationFAQ(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "FAQ ❓"
            },
            "footer": {
                "text": "Perguntas Frequentes"
            },
            "action": {
                "button": "Ver Opções",
                "sections": [
                    {
                        "title": "Ursula 🧸",
                        "rows": [
                            {
                                "id": "urs_who",
                                "title": "Ursula",
                                "description": "Quem é nossa assistente digital ?"
                            },                            
                            {
                                "id": "urs_work",
                                "title": "Funcionamento",
                                "description": "Como a Ursula trabalha ?"
                            },
                            {
                                "id": "urs_access",
                                "title": "Acessos",
                                "description": "Eu consigo acessar a Ursula ?"
                            }
                        ]
                    },
                    {
                        "title": "Granto US",
                        "rows": [
                            {
                                "id": "grt_team",
                                "title": "Time",
                                "description": "Quem é o Time da GrantoUS ?"
                            },                            
                        ]
                    }
                ]
            }
        }
    });
    return data;
}


function listLastFiveChats(number, rows){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Chats 🤖"
            },
            "footer": {
                "text": "Assistente Digital"
            },
            "action": {
                "button": "Opções",
                "sections": [
                    {
                        "title": "Chat LIst 💻",
                        "rows": rows
                    }
                ]
            }
        }
    });
    return data;
}

function operationAgent(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Operações 🤖"
            },
            "footer": {
                "text": "Assistente Digital"
            },
            "action": {
                "button": "Opções",
                "sections": [
                    {
                        "title": "Menu 💻",
                        "rows": [
                            {
                                "id": "urs_translate",
                                "title": "Anotações",
                                "description": "Criar anotações de mp3 file"
                            },                            
                            {
                                "id": "urs_assistant",
                                "title": "Lian",
                                "description": "Iniciar conversa com modelo"
                            }
                        ]
                    }
                ]
            }
        }
    });
    return data;
}

function OperationUrsula(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Lian ✨"
            },
            "footer": {
                "text": "Assistente Digital"
            },
            "action": {
                "button": "Opções",
                "sections": [
                    {
                        "title": "Menu 💻",
                        "rows": [
                            {
                                "id": "urs_analist",
                                "title": "Análise",
                                "description": "Análise Contratual da Lian"
                            },                            
                            {
                                "id": "urs_backoffice",
                                "title": "Backoffice",
                                "description": "Acessar aplicação web"
                            },                            
                            {
                                "id": "urs_faqs",
                                "title": "FAQ",
                                "description": "Duvidas Frequentes (Lian)"
                            }
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

function GetNotUser(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "cta_url",
            "header": {
                "type": "text",
                "text": "Cadastro FiveGuys"
            },
            "body": {
                "text": "Click no botão para acessar nossa plataforma."
            },
            "footer": {
                "text": "FiveGuys 💾"
            },
            "action": {
                "name": "cta_url",
                "parameters": {
                    "display_text": "Cadastrar",
                    "url": "https://www.fiveguysinthebike.online/accounts/register/"
                }
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
                "text": "Plataforma FiveGuys"
            },
            "body": {
                "text": "Click no botão para acessar nossa plataforma."
            },
            "footer": {
                "text": "FiveGuys 💾"
            },
            "action": {
                "name": "cta_url",
                "parameters": {
                    "display_text": "Plataforma",
                    "url": "https://www.fiveguysinthebike.online/"
                }
            }
        }
    });
    return data;
}

function GetOutDoorBackoffice(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "cta_url",
            "header": {
                "type": "text",
                "text": "Plataforma FiveGuys"
            },
            "body": {
                "text": "Click no botão para acessar nossa plataforma."
            },
            "footer": {
                "text": "FiveGuys"
            },
            "action": {
                "name": "cta_url",
                "parameters": {
                    "display_text": "Plataforma",
                    "url": "https://www.fiveguysinthebike.online/"
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
OperationUrsula,
operationAgent,
listLastFiveChats,
Button,
QrCode,
MessageLocation,
modelDoc,
OperationFAQ,
GetOutDoorData,
GetNotUser,
GetOutDoorBackoffice
};