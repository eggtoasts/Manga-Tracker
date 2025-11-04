import express from "express";

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Get request :p");
});

app.listen(PORT, () => {
  console.log("Listening.");
});
