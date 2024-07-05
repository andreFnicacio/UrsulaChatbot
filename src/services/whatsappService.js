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
            Authorization: "Bearer EAAE6xtz2mScBO2nMjo8s80K4Th84WLpYi5ZADCOrYtl4qXnZC7VcEmzfcpm80xJITXtEAAaf90dyLPZCmklV8jw8A5Yp2EQNdH7sq1XknbX0vu2DtwVqXGQQGsr42V3SgeuE4rKqAIcUDreJ5CBHTJsHWTjEHZC3l4ZCRJXWnSjAZCLa5VNIzniFe3ky0MeU5y5AZDZD"
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