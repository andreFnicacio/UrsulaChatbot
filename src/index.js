const express = require("express");
const apiRoute = require("./routes/routes");

const app = express();

const PORT = 8080;

app.use(express.json());

app.use("/whatsapp", apiRoute);

app.listen(PORT, () => {console.log("el puerto es: " + PORT)});