const whatsappService = require("../services/whatsappService");
const checkClientExists = require("../util/api/checkclient");
const whatsappModel = require("../shared/whatsappmodels")
const flowDefault = require("../roadmap/flowDefault");

async function Process(textUser,number) {
    try {
        // Coloca o texto em minúsculas para facilitar o processamento
        textUser = textUser.toLowerCase();
        let user
        // Verifica se o cliente existe (via Redis ou Banco de Dados)
        console.log("Numero Request:",number);
        
        user = await checkClientExists(number);     

        let models;

        if (user) {
            // Caso o cliente exista, segue para o fluxo padrão
            console.log("User Exist: (Put the Messages):", textUser);
            models = await flowDefault(number, user, textUser);
        } else {
            const notAuserYet = whatsappModel.GetNotUser(number)
            whatsappService.SendMessageWhatsApp(notAuserYet);
        }

        // Envia as mensagens através do WhatsApp Service
        if (models && models.length > 0) {
            models.forEach(async (model) => {
                try {
                    await whatsappService.SendMessageWhatsApp(model);
                    return;
                } catch (error) {
                    console.error(`Erro ao enviar mensagem para ${number}:`, error);
                }
            });
        }
    } catch (error) {
        console.error('Erro no processamento da mensagem:', error);
    }
}

module.exports = {
    Process
};
