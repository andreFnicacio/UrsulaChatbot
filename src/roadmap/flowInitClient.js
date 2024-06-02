const whatsappModel = require("../shared/whatsappmodels");
const inputClient = require("../util/api/inputClient");

async function flowInitClient(number,textUser) {
    // Se não existir, manda mensagem de despedida
    var models = [];
    textUser= textUser.toLowerCase();
    switch (textUser) {
        case 'confirm_follow':
            const clientData = {
                name: "name",
                email: "email",
                phone: number,
                unique_key: "unique_key",
                id_session: `session_${number}`,
                id_phone: number,
                session_status: false,
                flow_roadmap: "signup_flow",
                step_flow: "start" 
            };     
            await inputClient(clientData);    
            var textClient = "Maravilha!! Vamos agora pegar algumas informações ok? 😄";
            const decision_tree = ["signup_follow", "await_step"];
            var button = whatsappModel.Button(textClient,number,decision_tree);            
            models.push(button);                                          
            break;  
            
        case 'await_init':
            models.push(whatsappModel.MessageText("Sem problemas! Quando quiser é so me chamar!", number));
            break;
                
        default:
            var textClient = "Percebi que não tenho você na base de dados 😬\nGostaria de iniciar um *Cadastro Manual* ?";
            const decision_tree_way = ["confirm_follow", "await_init"];
            var button = whatsappModel.Button(textClient,number,decision_tree_way);            
            models.push(button);  
            break;                                    
            
    }
    return models;    
}

function generateRandomLetters(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

module.exports = flowInitClient;