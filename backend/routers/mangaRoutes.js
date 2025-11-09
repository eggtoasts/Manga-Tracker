import express from "express";
import controllers from "../controllers/mangaController.js";
const mangaRouter = express.Router();

// Get all mangas
mangaRouter.get("/manga", controllers.getAllMangas);

// Adding mangas
mangaRouter.post("/manga", controllers.addManga);

//Adding a manga reccomendation
mangaRouter.post(
  "/users/:userId/manga/:mangaId/recommendations",
  controllers.addMangaRec
);

//Updating a Specific manga post
mangaRouter.put("/recommendations/:recId", controllers.updateMangaRec);

//Deleting a Specific manga post
mangaRouter.delete(
  "/users/:userId/manga/:mangaId/recommendations/:recId",
  (req, res) => {
    res.send("Deleted recommendation");
  }
);

export default mangaRouter;
