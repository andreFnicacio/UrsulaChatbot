"use strict";

var express = require("express");
var apiRoute = require("./routes/routes");
var app = express();
var PORT = 8080;
app.use(express.json());
app.use("/whatsapp", apiRoute);
app.listen(PORT, function () {
  console.log("el puerto es: " + PORT);
});