const whatsappModel = require("../shared/whatsappmodels");
const inputClient = require("../util/api/inputClient");

async function flowInitClient(number,textUser) {
    // Se não existir, manda mensagem de despedida
    var models = [];
    textUser= textUser.toLowerCase();
    const randomLetters = generateRandomLetters(6);    
    switch (textUser) {
        case 'signup_follow':
            const clientData = {
                name: "name",
                email: "email",
                phone: number,
                unique_key: "unique_key",
                id_session: `session_${randomLetters}`,
                id_phone: number,
                flow_roadmap: "default",
                step_flow: "" 
            };     
            console.log(clientData);
            const input = await inputClient(clientData);    
            console.log(input);
            models.push(whatsappModel.MessageText("Perfeito!! Vamos então inciar o cadastro de perfil tudo bem ?", number));            
            break;

        case 'await_follow':
            models.push(whatsappModel.MessageText("Sem Problemas! Me chame quando quiser!", number));
            break;                
                
        default:
            var textClient = "Gostaria de criar um cadastro ? 😊";
            const decision_tree = ["signup_follow", "await_follow"];
            var button = whatsappModel.Button(textClient,number,decision_tree);            
            models.push(button);                      
            
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