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

//custom filter for genre
// this get rid of useless genres
function genreFilter(genreName) {
  switch (genreName) {
    case "Award Winning":
      return false;

    default:
      return genreName;
  }
}

//this shortens genre names
function genreShortened(genreName) {
  switch (genreName) {
    case "Boys Love":
      return "BL";
    case "Girls Love":
      return "GL";
    default:
      return genreName;
  }
}

//searches for manga based on title
displayManga.get("/search", async (req, res) => {
  //req body should have the query but we'll test that later xd

  const { query } = req.body;

  //   const query = "usogui";
  //the %22 is just unicode for quotes
  const URL = `https://api.jikan.moe/v4/manga?q=%22${query}%22?sfw`;
  const searchManga = await axios.get(URL);
  const searchMangaData = searchManga.data.data;

  try {
    console.log(searchMangaData);
    res.json(searchMangaData);
  } catch (error) {
    console.log(error);
  }
});

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
          .filter((g) => genreFilter(g.name))
          .map((g) => genreShortened(g.name)),
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
