const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const processMessage = require("../shared/processMessage");
const webhook = require("../roadmap/webhookStatus");

const VerifyToken = (req, res) => {
    
    try{
        var accessToken = "RTQWWTVHBDEJHJKIHFXGDS2090DS";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if(challenge != null && token != null && token == accessToken){
            res.send(challenge);
        }else{
            res.status(400).send();
        }

    }catch(e){
        res.status(400).send();
    }
}

const StatusSession = async (req, res) => {
    
    try{ 
        await webhook.status(req,res);
        
        res.send("Ok");

    }catch(e){
        res.status(400).send();
    }
}


const ReceivedMessage = (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"];        
        if(typeof messageObject != "undefined"){
            var messages = messageObject[0];
            var number = messages["from"];

            var text = GetTextUser(messages);
            
            if(text != ""){
                processMessage.Process(text, number);
            } 

        }        

        res.send("EVENT_RECEIVED");
    }catch(e){
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

function GetTextUser(messages){
    var message_client = "";
    var typeMessge = messages["type"];
    if(typeMessge == "text"){
        message_client = (messages["text"])["body"];
    }
    else if(typeMessge == "interactive"){

        var interactiveObject = messages["interactive"];
        var typeInteractive = interactiveObject["type"];
        
        if(typeInteractive == "button_reply"){
            message_client = (interactiveObject["button_reply"])["id"];
        }
        else if(typeInteractive == "list_reply"){
            message_client = (interactiveObject["list_reply"])["id"];
        }else{
            myConsole.log("sin mensaje");
        }
    }else if (typeMessge == "document"){
        console.log("Tipagem de Mensagens Documents: ",messages);
    }
    else{
        myConsole.log("sin mensaje", messages);
    }
    return message_client;
}

module.exports = {
    VerifyToken,
    ReceivedMessage,
    StatusSession
}
