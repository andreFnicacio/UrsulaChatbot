const express = require("express");
const apiRoute = require("./routes/routes");

const app = express();

const PORT = 8080;

app.use(express.json());

app.use("/whatsapp", apiRoute);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });