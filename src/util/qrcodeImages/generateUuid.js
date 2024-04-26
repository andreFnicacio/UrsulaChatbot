const { v4: uuidv4 } = require('uuid');

function generateUUID() {
    return uuidv4(); // Gera um UUID v4
}


module.exports = {generateUUID};
