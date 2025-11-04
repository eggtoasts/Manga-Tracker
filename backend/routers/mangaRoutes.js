import express from "express";
import controllers from "../controllers/mangaController.js";
const mangaRouter = express.Router();

// Adding mangas
mangaRouter.post("/manga", controllers.addManga);

//Adding users
mangaRouter.post("/users/", async (req, res) => {
  controllers.addUser;
});

//Getting all mangas
mangaRouter.get("/manga", (req, res) => {
  res.send("This is /manga. Lists all mangas");
});

//Adding a manga reccomendation
mangaRouter.post(
  "/users/:userId/manga/:mangaId/recommendations",
  controllers.addMangaRec
);

//Updating a Specific manga post
mangaRouter.put(
  "/users/:userId/manga/:mangaId/recommendations/:recId",
  (req, res) => {
    res.send("Updated recommendation.");
  }
);

//Deleting a Specific manga post
mangaRouter.delete(
  "/users/:userId/manga/:mangaId/recommendations/:recId",
  (req, res) => {
    res.send("Deleted recommendation");
  }
);

export default mangaRouter;
