const redis = require('redis');

const client = redis.createClient({
    url: 'redis://default:bXeBeZaIhatruSyffQeqszeRktdoWImJ@viaduct.proxy.rlwy.net:32106', // ajuste isso para a URL do seu servidor Redis
    socket: {
        connectTimeout: 500000
    }
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.connect();

async function setUserState(userId,state) {
    try {
        await client.setEx(userId, state.deadline, JSON.stringify(state));
    } catch (error) {
        console.error('Failed to set user state in Redis with expiration', error);
        throw error; // Re-lança o erro para garantir que seja tratado mais acima na cadeia de chamadas
    }
}

async function getUserState(userId) {
    try {
        const data = await client.get(userId);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to get user state from Redis', error);
        throw error; // Re-lança o erro para garantir que seja tratado mais acima na cadeia de chamadas
    }
}

module.exports = {setUserState,getUserState}