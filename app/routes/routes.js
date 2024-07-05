"use strict";

var expres = require("express");
var router = expres.Router();
var whatsAppController = require("../controllers/whatsappControllers");
router.get("/", whatsAppController.VerifyToken).post("/status", whatsAppController.StatusSession).post("/", whatsAppController.ReceivedMessage);
module.exports = router;