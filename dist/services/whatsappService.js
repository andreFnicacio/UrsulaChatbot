"use strict";

var https = require("https");
function SendMessageWhatsApp(data) {
  var options = {
    host: "graph.facebook.com",
    path: "/v18.0/433929899800727/messages",
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer EAAq1JrfgMZBUBOZB8NFzP6ddVbzyWoDqLrTbSgTyLP61gx2pK6gZBv7VO87HJPTtMPWZCFzfbCZAUULM8zz0k7lYW2wGJ8W1aHngQJC9g8OGy25egkamTjMZCfpRKnU3WYDEVs4ZBYTgF6oWiDpc3CZCq7yyZAaBQcilk1aZAmH7HePyVJKJSLtIyRhFK21F8IUuWgjAZDZD"
    }
  };
  var req = https.request(options, function (res) {
    res.on("data", function (d) {
      process.stdout.write(d);
    });
  });
  req.on("error", function (error) {
    console.log("Stage Error");
    console.error(error);
  });
  req.write(data);
  req.end();
}
module.exports = {
  SendMessageWhatsApp: SendMessageWhatsApp
};