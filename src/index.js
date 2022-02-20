const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to our schedule website");
});

app.get("/users", (req, res) => {
  res.json(myData.users); //zwraca liste uzytkowników
});

app.get("/schedules", (req, res) => {
  res.send(myData.schedules); //zwraca liste terminow
});

const myData = require("./data");

app.listen(3000, () => {
  console.log(`http://localhost:3000/ is waiting for requests.`);
});
