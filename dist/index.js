"use strict";

var express = require("express");
var apiRoute = require("./routes/routes");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/whatsapp", apiRoute);
app.listen(PORT, function () {
  console.log("el puerto es: " + PORT);
});