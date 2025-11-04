import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Get request :p");
});

app.listen(PORT, () => {
  console.log("Listening.");
});

async function initDB() {
  try {
    const res = await sql`
    CREATE TABLE IF NOT EXISTS test ()
    `;
  } catch (error) {
    console.log("Error");
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running");
  });
});
