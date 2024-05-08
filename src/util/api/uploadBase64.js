const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function uploadImage(session) {
    const filePath = `qrcode_${session}.png`;

    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return;
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath), {
        filename: `qrcode_${session}.png`,
        contentType: 'image/png'
    });
    formData.append('messaging_product', 'whatsapp');

    const config = {
        headers: {
            ...formData.getHeaders(),
            'Authorization': "Bearer EAAE6xtz2mScBO2ASoRrT06A42wIhw6ZCkjZA9GBG1tn4Jefly2S9qzvoi6SsNtjHA8C0Hvqhk7u1BkN3noOuty0ur7sGqL6eR9I3blmnZBA3YpwUv97yJ9CS4El9IfS3p3Xq1GgI0QQP6YMBy7jigLZAMbarY5UpHOZCiLgpovuPZBWMi2Hr2b4fGDW0sGNPUShOiZBAG9bK68lW2DJdtlbN8Snv8ZAo1Nnz1P5LJv8GBz9OZCl1yGyZAK" // Utiliza variável de ambiente
        },
        timeout: 50000
    };

    try {
        const response = await axios.post("https://graph.facebook.com/v18.0/262715723599699/media", formData, config);
        return response.data.id;
    } catch (error) {
        if (error.response) {
            console.error('Upload failed:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

module.exports = uploadImage;

