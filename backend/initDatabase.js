import { sql } from "./config/db.js";

async function initMangaDB() {
  try {
    const res = await sql`
    CREATE TABLE IF NOT EXISTS manga (
  id SERIAL PRIMARY KEY,
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
  id SERIAL PRIMARY KEY,
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
  id SERIAL PRIMARY KEY,
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

async function initUserMangaListDB() {
  try {
    const res = await sql`
    CREATE TABLE IF NOT EXISTS user_manga_list(
    user_id INT REFERENCES users(id),
    manga_id INT REFERENCES manga(id),
    reading_status VARCHAR(50) NOT NULL,
    chapters_read INT DEFAULT 0,
    user_rating INT,
    notes TEXT,
    PRIMARY KEY (user_id, manga_id),
    CONSTRAINT valid_reading_status CHECK (
          reading_status IN ('reading', 'completed', 'plan_to_read', 'on_hold', 'dropped')
        )
    )`;
  } catch (error) {
    console.log("Error initUserMangaListDB", error);
  }
}

export default async function initDB() {
  await initMangaDB();
  await initUsersDB();
  await initPostDB();
  await initMangaPostUser();
  await initUserMangaListDB();
}
