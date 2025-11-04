import express from "express";
const mangaRouter = express.Router();

//OOOH I shold also inplement a manga api heh..

//table should be:
// name, cover, description, review, rating, status (finished, reading, read-later), cover, recommended by...

//i want:
//update manga,
//delete manga
//insert manga

//Getting all mangas
mangaRouter.get("/manga", (req, res) => {
  res.send("This is /manga. Lists all mangas");
});

//Adding a manga reccomendation
mangaRouter.post(
  "/users/:userId/manga/:mangaId/recommendations",
  (req, res) => {
    const { userId, mangaId } = req.params;
    const { review, rating } = req.body;
    res.send(
      `Post req- User ${userId} recommends manga ${mangaId} with rating ${rating}`
    );
  }
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
