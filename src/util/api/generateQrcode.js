const axios = require('axios');
const updateClient = require("./updateClient");
const uploadBase64 = require("./uploadBase64");
const sharp = require('sharp');


async function generateQrcode(session,user) {
    //Gerando Token da Seção & Startando await QrCode like true    
    const token = await generateToken(session);
    try {
        const base64 = await startSession(session,token);
        const base64Image = base64.qrcode.split(';base64,').pop();

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

async function generateToken(session) {
    console.log("Iniciando Geração de Token");
    try {
        const response = await axios.post(`http://localhost:21465/api/${session}/THISISMYSECURETOKEN/generate-token`);
        console.log("Token capturado: ", response.data.token);

        return response.data.token;
    } catch (error) {
        console.error('Erro ao verificar cliente GENERATE TOKEN (GET_QRCODE): ', error);
        return false;
    }
}


async function startSession(session,token) {
    console.log("Iniciando seção");
    const url = `http://localhost:21465/api/${session}/start-session`;
    const postData = {
        webhook: null,
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
