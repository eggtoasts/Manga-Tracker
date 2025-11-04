import { sql } from "./config/db.js";

async function initMangaDB() {
  try {
    const res = await sql`
    CREATE TABLE IF NOT EXISTS manga (
  id INT PRIMARY KEY,
  name VARCHAR(250),
  description TEXT,
  cover_image VARCHAR(250),
  authors TEXT[],
  rating DECIMAL(3,1),
  genres TEXT[]
);`;
  } catch (error) {
    console.log("Error initMangaDB");
  }
}

async function initUsersDB() {
  try {
    const res = await sql`
    CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(100),
  name_color VARCHAR(50)
);`;
  } catch (error) {
    console.log("Error initUsersDB");
  }
}

async function initPostDB() {
  try {
    const res = await sql`
    CREATE TABLE IF NOT EXISTS post (
  id INT PRIMARY KEY,
  review TEXT,
  rating INT,
  likes INT DEFAULT 0
);`;
  } catch (error) {
    console.log("Error initPostDB");
  }
}

async function initMangaPostUser() {
  try {
    const res = await sql`
    CREATE TABLE IF NOT EXISTS manga_post_user (
  manga_id INT REFERENCES manga(id),
  post_id INT REFERENCES post(id),
  user_id INT REFERENCES users(id),
  PRIMARY KEY (manga_id, post_id, user_id)
);`;
  } catch (error) {
    console.log("Error initMangaPostUser", error);
  }
}

export default async function initDB() {
  initMangaDB();
  initUsersDB();
  initPostDB();
  initMangaPostUser();
}
