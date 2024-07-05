const whatsappModel = require("../shared/whatsappmodels");

async function flowDefault(user, textUser) {
    // Se não existir, manda mensagem de despedida
    var models = [];
    textUser = textUser.toLowerCase();
    const token = user.token;
    const phone = user.phone;
    const session = user.id_session;
    const step = user.step_flow;

    if (textUser === "await_session"){

        models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, phone)); 
        return models;
    }    

    switch (step) {
        case 'document':
            models.push(whatsappModel.MessageText(`
                📄 Detalhes do Contrato 📄:

                🤝 Contratante: Sofie Tecnologia Ltda
                🆔 CNPJ do Contratante: 29.676.543/0001-05
                📋 Contratada: Quilombus Network
                💰 Valor Contratado: R$ 3.500,00
                📅 Validade Inicial: 01/03/2022
                ⏳ Duração: Pelo prazo determinado de 12 (doze) meses                
                `, phone));                                      
            break;    
	case 'send_campaign':
	    models.push(whatsappModel.MessageText('Perfeito! Pode encaminhar o contrato :D'));      
        case 'backoffice_account':     
            models.push(whatsappModel.GetOutDoorData(phone));                                      
            break;              
        case 'input_leads':
            models.push(whatsappModel.modelDoc(phone));    
            models.push(whatsappModel.MessageText("Estamos encaminhando a planilha atualizada!", phone));
            break;                
        case 'await_session':
            models.push(whatsappModel.MessageText(`Ok ${user.name}! Me chame novamento quando quiser!! 😊`, phone));             
            break;    
        case 'default_operation':
            var operationList = whatsappModel.OperationDefault(phone); 
            models.push(operationList);
            break;                
        default:
            var textClient = `Olá Vinicius, Bem vindo novamente!! Gostaria de entrar no *menu* da sua sessão?`;
            const decision_tree_way = ["default_operation", "await_session"];
            var button = whatsappModel.Button(textClient, phone, decision_tree_way);            
            models.push(button);    
            break;                                                      
            
    }
        
    return models;    
}

module.exports = flowDefault;
