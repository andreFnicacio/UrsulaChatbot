const expres = require("express");
const router = expres.Router();
const whatsAppController = require("../controllers/whatsappControllers");

router
.get("/", whatsAppController.VerifyToken)
.post("/status", whatsAppController.StatusSession)
.post("/", whatsAppController.ReceivedMessage)

module.exports = router;