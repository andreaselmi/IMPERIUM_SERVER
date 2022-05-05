require("dotenv").config();
const express = require("express");
const app = express();
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
    to: "andreaselmi90@gmail.com",
    // Change to your recipient
    from: "prenotazioni@imperium-motus.it",
    // Change to your verified sender
    subject: "Prenotazione",
    text: `Prenotazione da ${name}, telefono: ${phone}, Info addizionali: ${info}`,
    html: `Prenotazione da ${name}, telefono: ${phone}, Info addizionali: ${info}`,
  };
  sendgrid
    .send(msg)
    .then((resp) => {
      res.send("Messaggio ok");
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
