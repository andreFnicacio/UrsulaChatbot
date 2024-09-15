const whatsappModel = require("../shared/whatsappmodels");
const inputClient = require("../util/api/inputClient");

async function flowInitClient(number,textUser) {
    // Se não existir, manda mensagem de despedida
    var models = [];
    textUser= textUser.toLowerCase();
    switch (textUser) {
        case 'confirm_follow':
            var operationList = whatsappModel.OperationFAQ(number); 
            models.push(operationList);
            break;    
        
        case 'urs_who':
            models.push(whatsappModel.MessageText("Ursula é nossa assistente digital super poderosa 🚀, treinada com mais de 100 mil contratos em diversos formatos. Ela analisa documentos, extrai informações importantes e te dá aquele suporte automatizado para facilitar a gestão dos seus contratos. 😉.", number));
            break;
            
        case 'urs_work':
            models.push(whatsappModel.MessageText("A mágica por trás da Aurora é usar a Meta Cloud API, nossa própria API e uma conexão verificada com a OpenAI. Ela processa audios legíveis (a nível de computação) 🖥️, extrai os dados relevantes e responde de forma rápida e segura. 💡", number));
            break; 

        case 'urs_access':
            models.push(whatsappModel.MessageText("Você pode acessar a Ursula pelo nosso portal online, disponível no site da Granto Seguros 🌐. Só fazer login e começar a usar os serviços da nossa assistente digital top! 😃", number));
            models.push(whatsappModel.GetOutDoorData(number));                                      
            break;               
            
        case 'grt_team':
            models.push(whatsappModel.MessageText(`
                Equipe *GrantoUS*

                André Ferreira Nicácio: Graduando em Análise e Desenvolvimento de Sistemas pelo IFTM - Ituiutaba. Técnico em Informática pelo mesmo instituto. Experiência em desenvolvimento de chatbot e análise financeira na Sofi (2022-2023) e inteligência artificial para estilometria. Atualmente, desenvolve IA para análise preditiva de sentenças judiciais.

                Vitori Oliveira: Graduando em Análise e Desenvolvimento de Sistemas pelo IFTM - Ituiutaba e Bacharel em Agronomia pela UEMG. Técnico em Informática pelo IFTM. Foco em frontend com projetos de web scraping. Conhecimentos em HTML, CSS, JavaScript, Node.js, React.js, Next.js, Angular, Tailwind CSS e Styled-Components.

                Vinicius: Graduando em Análise e Desenvolvimento de Sistemas pelo IFTM. Participante do PET, desenvolve monitorias e materiais didáticos. Pesquisador no projeto sobre a eficácia do ChatGPT na resolução de questões do ENADE. Conhecimentos em HTML, CSS, JavaScript e UX/UI Design.

                Professor Rodrigo Grassi: Bacharel em Ciência da Computação (UFMS), Mestre (UNICAMP) e Doutor em Engenharia Elétrica (UFU). Professor no IFTM - Ituiutaba. Coordenou projetos inovadores como ScoutCoach e LACIA. Atualmente coordena um projeto de IA focado na prevenção de doenças, fomentado pela unidade Embrappi do IFTM.                
            `, number));
            break;                                    
            
        case 'await_init':
            models.push(whatsappModel.MessageText("Sem problemas! Quando quiser é so me chamar!", number));
            break;
                
        default:
            var textClient = "Oi! Tudo bem? 😃 Se tiver alguma dúvida sobre o sistema, estou aqui para ajudar! Quer tirar alguma dúvida agora?";
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