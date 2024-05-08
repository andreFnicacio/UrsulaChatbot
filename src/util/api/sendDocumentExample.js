const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function sendDocumentModel(phone) {
    const postData = {        
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: phone,
        type: "document",
        document: {
            link: "https://docs.google.com/spreadsheets/d/1eqoRDFFFaFO5yEIdwSSAsS3bZZj014QqbFm8Uh06pZo/edit?usp=sharing",
            caption: "Modelo de Exemplo 📂"
        }        
    };

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAE6xtz2mScBO2ASoRrT06A42wIhw6ZCkjZA9GBG1tn4Jefly2S9qzvoi6SsNtjHA8C0Hvqhk7u1BkN3noOuty0ur7sGqL6eR9I3blmnZBA3YpwUv97yJ9CS4El9IfS3p3Xq1GgI0QQP6YMBy7jigLZAMbarY5UpHOZCiLgpovuPZBWMi2Hr2b4fGDW0sGNPUShOiZBAG9bK68lW2DJdtlbN8Snv8ZAo1Nnz1P5LJv8GBz9OZCl1yGyZAK"
        }
    };

    try {
        const response = await axios.post("https://graph.facebook.com/v18.0/262715723599699/messages", postData, config);
        return response.data.id;
    } catch (error) {
        if (error.response) {
            console.error('Upload failed:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

module.exports = sendDocumentModel;

