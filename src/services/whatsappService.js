const https = require("https");
function SendMessageWhatsApp(data){
    
    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/433929899800727/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAq1JrfgMZBUBO03nANONWpitZBzVf4OVoSGee55MlAItQylIf55UEnwZA3qXMB558ZCOhd6w69EUQPYH94ySBE4nYmJZB2WIsnZATJjPkmnjTYSljteTk5VZBPuHGuWRE8FScBGZAcBwgxsq5H7z0qZA0voOTYZALHCnKmCW3rRYgFZCOWZB4GxTzr4rZAfutKe7V2CPzkZCuOI3pnyGOnKcMuh4xZA4oaBHYzT3xceZC0Ojmnx7RqXBbmU7mkZD"
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