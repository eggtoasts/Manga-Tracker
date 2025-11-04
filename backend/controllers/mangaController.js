import { sql } from "../config/db.js";

const getAllMangas = async (req, res) => {
  try {
    const mangas = await sql`SELECT * FROM manga`;
    res.send(mangas);
  } catch (err) {
    console.log("Error: ", err);
  }
};

//For adding users
const addUser = async (req, res) => {
  const { username, name_color, password } = req.body;
  try {
    //add entry to post and retrieve id
    await sql`
           INSERT INTO users (username, name_color, password)
           VALUES (${username}, ${name_color}, ${password})
           RETURNING id
         `;

    res.send(`Created user`);
  } catch (err) {
    console.log("Error: ", err);
  }
};

//For adding manga into the database
const addManga = async (req, res) => {
  const { name, description, cover_image, authors, rating, genres } = req.body;

  try {
    const [newManga] = await sql`
           INSERT INTO manga (name, description, cover_image, authors, rating, genres) 
           VALUES (
             ${name}, 
             ${description}, 
             ${cover_image}, 
             ${authors}::text[],
             ${rating}, 
             ${genres}::text[]
           )
           RETURNING id, name, description, cover_image, authors, rating, genres
         `;

    res.status(201).json({
      message: "Created manga",
      manga: newManga,
    });
  } catch (err) {
    console.error("Error creating manga:", err);
    res.status(500).json({ error: "Failed to create manga" });
  }
};

//For adding manga recommendation posts
const addMangaRec = async (req, res) => {
  const { userId, mangaId } = req.params;
  const { review, rating } = req.body;

  try {
    //add entry to post and retrieve id
    const postResult = await sql`
      INSERT INTO post (review, rating, likes)
      VALUES (${review}, ${rating}, 0)
      RETURNING id
    `;
    const postId = postResult[0].id;

    //Add relation between manga id, post id, and user id who posted the rec.
    await sql`
      INSERT INTO manga_post_user (manga_id, post_id, user_id)
      VALUES (${mangaId}, ${postId}, ${userId})
    `;

    res.send(
      `Post req- User ${userId} recommends manga ${mangaId} with rating ${rating} and reviewed with ${review}`
    );
  } catch (err) {
    console.log("Error: ", err);
  }
};

//Updating a manga post given the id of post

const updateMangaRec = async (req, res) => {
  const { recId } = req.params;
  const { review, rating } = req.body;
  try {
    //add entry to post and retrieve id
    await sql`
          UPDATE post SET review=${review}, rating=${rating} 
          WHERE id = ${recId}
         `;

    res.send("Updated manga post");
  } catch (err) {
    console.log("Error: ", err);
  }
};

const controllers = {
  getAllMangas,
  addMangaRec,
  addManga,
  addUser,
  updateMangaRec,
};

export default controllers;
