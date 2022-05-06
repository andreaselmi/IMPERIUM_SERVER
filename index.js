require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const sendgrid = require("@sendgrid/mail");

const SENDGRID_API_KEY = process.env.EMAIL_API_KEY;
const PORT = 3000;

sendgrid.setApiKey(SENDGRID_API_KEY);

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("I'M MAIL SENDER");
});

app.post("/mail", (req, res) => {
  const { name, phone, info } = req.body;

  const msg = {
    to: process.env.EMAIL_SEND_TO,
    // Change to your recipient
    from: process.env.EMAIL_SEND_FROM,
    // Change to your verified sender
    subject: "Prenotazione",
    text: `Prenotazione da ${name}, telefono: ${phone}, Info addizionali: ${info}`,
    html: `Prenotazione da ${name}, telefono: ${phone}, Info addizionali: ${info}`,
  };
  sendgrid
    .send(msg)
    .then((resp) => {
      res.status(200).send("Mail inviata correttamente");
    })
    .catch((error) => {
      res.status(500).send("Si è verificato un errore");
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
