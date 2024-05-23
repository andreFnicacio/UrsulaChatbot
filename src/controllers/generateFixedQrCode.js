// qrCodeController.js

const QRCode = require('qrcode');
const sharp = require('sharp'); // Importando a biblioteca sharp
const uploadBase64 = require('../util/api/uploadBase64');

const generateFixedQrCode = async (session, phone) => { // Adicionando session como parâmetro
  try {
    const url = `https://wa.me/${phone}?text=%5BCHECKIN%5D%20-%20Ativar%20promo%C3%A7%C3%A3o%20%F0%9F%98%81`;
    const qrCodeFileName = `${session}_${phone}.png`;
    const qrCodeData = await QRCode.toDataURL(url);

    // Removendo o prefixo data:image/png;base64, se houver
    const base64Data = qrCodeData.replace(/^data:image\/png;base64,/, '');

    await sharp(Buffer.from(base64Data, 'base64'))
      .toFile(qrCodeFileName)
      .then(() => {
        console.log('Image saved');
      })
      .catch(err => {
        console.error(err);
      });

    // Gerando Objeto ID
    const objectIdimg = await uploadBase64(session,qrCodeFileName);

    return objectIdimg;
  } catch (err) {
    console.error(err);
    throw new Error('Erro ao gerar o QR Code');
  }
};

module.exports = generateFixedQrCode;
