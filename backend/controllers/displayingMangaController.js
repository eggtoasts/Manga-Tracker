import axios from "axios";
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

//http://localhost:3000/api/search?title=usogui    we use query to search for specific title since we cant send req bodies in frontend
const displayPopularManga = async (req, res) => {
  const URL = "https://api.jikan.moe/v4/top/manga?sfw";
  const displayPopularMangas = await axios.get(URL);
  const popularMangasArray = displayPopularMangas.data.data;

  try {
    let displayMangasArray = popularMangasArray.map((manga) => {
      return {
        id: manga.mal_id,
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
        chapters: manga.chapters,
      };
    });

    console.log(displayMangasArray);

    res.json(displayMangasArray);
  } catch (error) {
    res.status(500).json(error);
  }
};

const searchManga = async (req, res) => {
  const { title } = req.query;

  //the %22 is just unicode for quotes
  const URL = `https://api.jikan.moe/v4/manga?q=%22${title}%22&sfw=true`;
  const searchManga = await axios.get(URL);
  const searchMangaData = searchManga.data.data;

  try {
    let searchMangaArray = searchMangaData.map((manga) => {
      return {
        id: manga.mal_id,
        name: manga.title,
        image: manga.images.jpg.image_url,
        authors: manga.authors.map((a) => a.name),
        score: manga.score,
        description: manga.synopsis,
        genres: manga.genres
          .filter((g) => genreFilter(g.name))
          .map((g) => genreShortened(g.name)),
        rank: manga.rank,
        status: manga.status,
        chapters: manga.chapters,
      };
    });
    console.log(searchMangaArray);
    res.json(searchMangaArray);
  } catch (error) {
    console.log(error);
  }
};

const displaySpecificManga = async (req, res) => {
  const { mangaId } = req.params;

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const characterURL = `https://api.jikan.moe/v4/manga/${mangaId}/characters`;
  const URL = `https://api.jikan.moe/v4/manga/${mangaId}`;

  const searchManga = await axios.get(URL);
  await delay(350);
  const searchCharacters = await axios.get(characterURL);

  const manga = searchManga.data.data;

  try {
    let characters;
    // Get characters
    try {
      characters = searchCharacters.data.data
        .filter((c) => c.role === "Main")
        .map((characterObject) => {
          return {
            characterName: characterObject.character.name,
            characterImage: characterObject.character.images.jpg.image_url,
          };
        });
      console.log(characters);
    } catch (error) {
      console.log(error);
    }

    res.json({
      id: manga.mal_id,
      nameJapanese: manga.title_japanese,
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
      chapters: manga.chapters,
      characters,
      published: manga.published.prop.from,
    });
  } catch (error) {
    console.log(error);
  }
};

const controllers = { displayPopularManga, searchManga, displaySpecificManga };

export default controllers;
