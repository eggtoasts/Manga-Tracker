import express from "express";
import axios from "axios";
const displayManga = express.Router();

//Manga data:
// url
// images
// title
// status (publishing, completed)
// score
// rank
// synopsis
//authors (array)
// genres (array)
// themes

// displays popular mangas
displayManga.get("/mangas", async (req, res) => {
  const URL = "https://api.jikan.moe/v4/top/manga?sfw";
  const displayPopularMangas = await axios.get(URL);
  const popularMangasArray = displayPopularMangas.data.data;

  try {
    let displayMangasArray = popularMangasArray.map((manga) => {
      return {
        name: manga.title,
        image: manga.images.jpg.large_image_url,
        authors: manga.authors.map((a) => a.name),
        score: manga.score,
        description: manga.synopsis,
        genres: manga.genres
          .filter((g) => g.name !== "Award Winning")
          .map((g) => g.name),
        rank: manga.rank,
        status: manga.status,
      };
    });

    console.log(displayMangasArray);

    res.json(displayMangasArray);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default displayManga;
