const sendgrid = require("@sendgrid/mail");
const router = require("express").Router();

router.get("/", async (req, res) => {
  res.status(200).send("This is mail route");
});

router.post("/", (req, res) => {
  const { name, phone, info } = req.body;

  const msg = {
    to: process.env.EMAIL_SEND_TO,
    // Change to your recipient
    from: process.env.EMAIL_SEND_FROM,
    // Change to your verified sender
    subject: "Prenotazione",
    text: `Prenotazione da ${name}, telefono: ${phone}, Info addizionali: ${info}`,
    html: `<b>Prenotazione da:</b> ${name} </br> <b>telefono:</b> ${phone} </br>  <b>Info addizionali:</b> ${info}`,
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

module.exports = router;
