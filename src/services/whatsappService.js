const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const https = require("https");
function SendMessageWhatsApp(data){
    
    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/262715723599699/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAE6xtz2mScBO2ASoRrT06A42wIhw6ZCkjZA9GBG1tn4Jefly2S9qzvoi6SsNtjHA8C0Hvqhk7u1BkN3noOuty0ur7sGqL6eR9I3blmnZBA3YpwUv97yJ9CS4El9IfS3p3Xq1GgI0QQP6YMBy7jigLZAMbarY5UpHOZCiLgpovuPZBWMi2Hr2b4fGDW0sGNPUShOiZBAG9bK68lW2DJdtlbN8Snv8ZAo1Nnz1P5LJv8GBz9OZCl1yGyZAK"
        }
    };
    const req = https.request(options, res => {
        res.on("data", d=> {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.log("Stage Error")
        console.error(error);
    });

    req.write(data);
    req.end();
}

module.exports = {
    SendMessageWhatsApp
};