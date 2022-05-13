require("dotenv").config();
const mongoose = require("mongoose");
const email = require("./routes/email");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/mail", email);

const sendgrid = require("@sendgrid/mail");

const SENDGRID_API_KEY = process.env.EMAIL_API_KEY;
const PORT = process.env.PORT || 5000;

sendgrid.setApiKey(SENDGRID_API_KEY);

// const dbUrl = process.env.DB;
//
// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
//
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected to db success");
// });

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("I'M MAIL SENDER");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
