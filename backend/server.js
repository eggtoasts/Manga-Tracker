import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import mangaRouter from "./routers/mangaRoutes.js";
import displayManga from "./routers/displayingMangaRoutes.js";
import initDB from "./initDatabase.js";

dotenv.config();

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Get request :p");
});

app.listen(PORT, () => {
  console.log("Listening.");
});

//This handles all the manga routes, in routers/mangaRoutes
app.use("/", mangaRouter);

//For displaying manga, like when a user searches up manga or the default "popular page."
app.use("/", displayManga);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running");
  });
});
