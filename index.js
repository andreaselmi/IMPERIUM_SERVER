const express = require("express");
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello worldddddd");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
