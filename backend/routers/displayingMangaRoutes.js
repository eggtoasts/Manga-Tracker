import express from "express";

import controllers from "../controllers/displayingMangaController.js";

const displayManga = express.Router();

displayManga.get("/search", controllers.searchManga);

// displays popular mangas
displayManga.get("/mangas", controllers.displayPopularManga);

export default displayManga;
