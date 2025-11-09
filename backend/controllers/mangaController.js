import { sql } from "../config/db.js";

const getAllMangas = async (req, res) => {
  try {
    const mangas = await sql`SELECT * FROM manga`;
    res.status(200).json(mangas);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
};

const controllers = {
  getAllMangas,
  addMangaRec,
  addManga,
  updateMangaRec,
};

export default controllers;
