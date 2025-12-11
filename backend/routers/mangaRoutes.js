import express from "express";
import controllers from "../controllers/mangaController.js";
import userControllers from "../controllers/userController.js";

const mangaRouter = express.Router();

//Edit manga from user list
mangaRouter.put(
  "/userlist/:mangaId",
  userControllers.authenticateToken,
  controllers.editMangaFromUserList
);

//Get all the mangas from a certain user's list
mangaRouter.get(
  "/userlist",
  userControllers.authenticateToken,
  controllers.getAllMangasFromUserList
);

//Adding manga onto a user's list
mangaRouter.post(
  "/userlist",
  userControllers.authenticateToken,
  controllers.addMangaToUserList
);

mangaRouter.delete(
  "/userlist/:mangaId",
  userControllers.authenticateToken,
  controllers.deleteMangaFromUserList
);

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
