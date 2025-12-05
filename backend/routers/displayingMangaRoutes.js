import express from "express";

import controllers from "../controllers/displayingMangaController.js";

const displayManga = express.Router();

displayManga.get("/api/search", controllers.searchManga);

// displays popular mangas
displayManga.get("/api/mangas", controllers.displayPopularManga);

//gets information of a specific manga
displayManga.get("/mangas/:mangaId", controllers.displaySpecificManga);

export default displayManga;
