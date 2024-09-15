const https = require("https");
function SendMessageWhatsApp(data){
    
    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/346195811918047/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAE6xtz2mScBO0XvIvEXFI0ZCtRVUyDdz4MzJNeBZAZAE80ogFLTTveG0OVlZBDoJb9wNUUCxdkDGSazItFjsLVeNwD7ROZAc3ZBndgIdZBRD0fP9dS55vXSsHyG05qZCuUBGZBEsNdBclq7fdqR9ZBzS7TteXwF0VqkoIldumAW33dX4qWeDuBLUF6spMJwl2RPuSNgZDZD"
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