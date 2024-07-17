const axios = require('axios');
const updateClient = require("./updateClient");
const uploadBase64 = require("./uploadBase64");
const getQrCode = require("./getQrCode");
const sharp = require('sharp');
const redis = require("../redis/redis_config");
var base64Image;
var base64;

async function generateQrcode(session,user,token,revive = false) {
    //Gerando Token da Seção & Startando await QrCode like true        
    try {
        if (!revive){
            base64 = await startSession(session,token);
            base64Image = base64.qrcode.split(';base64,').pop();            
        }
        else{
            await getQrCode(session,token);
            base64 = await startSession(session,token);
            base64Image = base64.qrcode.split(';base64,').pop();            
        }
        

        await sharp(Buffer.from(base64Image, 'base64'))
          .toFile(`qrcode_${session}.png`)
          .then(() => {
            console.log('Image saved');
          })
          .catch(err => {
            console.error(err);
          });       

        //Gerando Objeto ID
        const objectIdimg = await uploadBase64(session);

        //Atualizando Infos do User
        user.token = token;
        const updateData = {"id_phone": user.phone, "updateData": user};
        await updateClient(updateData);  

        return objectIdimg;
    } catch (error) {
        if (error.response) {
            console.error('Erro de resposta do servidor GENERATE_QRCODE: ', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Erro de requisição: ', error.request);
        } else {
            console.error('Erro ao configurar a requisição: ', error.message);
        }
        return false;
    }
}


async function startSession(session,token) {
    console.log("Iniciando seção");
    const url = `https://grantosegurosapimanagement-production.up.railway.app/api/${session}/start-session`;
    const postData = {
        webhook: "https://4e18-2804-1e68-c803-737-a827-64e0-a37c-2f88.ngrok-free.app/whatsapp/status",
        waitQrCode:true
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 50000 // timeout de 5 segundos
    };

    try {
        const jsonPostData = JSON.stringify(postData);
        const response = await axios.post(url, jsonPostData, config);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erro de resposta do servidor START SESSION (GET_QRCODE): ', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Erro de requisição: ', error.request);
        } else {
            console.error('Erro ao configurar a requisição: ', error.message);
        }
        return false;
    }
}


module.exports = generateQrcode;
