import { sql } from "../config/db.js";

//adding manga to a user's list with "reading" status
const addMangaToUserList = async (req, res) => {
  const userId = req.user.id;

  const {
    mangaId: externalMangaId,
    name,
    description,
    cover_image,
    authors,
    rating,
    genres,
  } = req.body;

  const readingStatus = "reading";
  const chaptersRead = 0;
  const userRating = null;
  const notes = null;
  let localMangaId;

  if (!userId || !externalMangaId || !name) {
    return res
      .status(400)
      .json({ error: "Missing required data, User ID, Manga ID, or Name." });
  }

  try {
    //lookup and check if manga already exists in db
    const localManga = await sql`
            SELECT id FROM manga WHERE external_id = ${externalMangaId}
        `;

    if (localManga.length > 0) {
      //get the id if it exists
      localMangaId = localManga[0].id;
    } else {
      //manga is not found-- insert it into the DB
      console.log(
        `Manga ${name} not found locally. Importing new entry with external_id: ${externalMangaId}`
      );

      const [newManga] = await sql`
                INSERT INTO manga (name, description, cover_image, authors, rating, genres, external_id) 
                VALUES (
                   ${name}, 
                   ${description}, 
                   ${cover_image}, 
                   ${authors}::text[],
                   ${rating}, 
                   ${genres}::text[],
                   ${externalMangaId} 
                )
                RETURNING id;
            `;
      localMangaId = newManga.id;
    }

    //insert the entry (w/ localMangaId)
    //if it already exists (conflict), do nothing
    const [newEntry] = await sql`
            INSERT INTO user_manga_list (user_id, manga_id, reading_status, chapters_read, user_rating, notes)
            VALUES (${userId}, ${localMangaId}, ${readingStatus}, ${chaptersRead}, ${userRating}, ${notes})
            ON CONFLICT (user_id, manga_id) DO NOTHING
            RETURNING *
        `;

    //error check
    if (!newEntry) {
      return res.status(200).json({
        message: "Manga is already on the user's list.",
        entry: null,
      });
    }

    res.status(201).json({
      message: "Manga imported and added to user list (default: reading)",
      entry: newEntry,
    });
  } catch (err) {
    console.error("Error in addMangaToUserList:", err);
    res
      .status(500)
      .json({ error: "Failed to process request: " + err.message });
  }
};

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
  addMangaToUserList,
};

export default controllers;
