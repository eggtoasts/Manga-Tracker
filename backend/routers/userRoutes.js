import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";
import dotenv from "dotenv";
import userControllers from "../controllers/userController.js";

dotenv.config();

const userRouter = express.Router();

//Getting user info (if we have the json web token)
//remember: that authenticate token checks if we have token, and returns a user object
userRouter.get(
  "/profile",
  userControllers.authenticateToken,
  async (req, res) => {
    // get user id
    const userId = req.user.id;
    try {
      // search for id, username and name_color in database
      const [userInfo] =
        await sql`SELECT id, username, name_color FROM users WHERE users.id =${userId}`;

      // return that info!
      res.status(200).json({ user: userInfo });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

//Adding users (Sign up)
userRouter.post("/signup", async (req, res) => {
  // User auth
  const { username, password } = req.body;

  //purple color for everyone for now :p
  const color = "purple";

  //hash password (salt + hashedpass)
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    color: color,
    username: username,
    password: hashedPassword,
  };
  //   id is handled by database (serial)
  try {
    //add entry to post and retrieve id
    const [newUser] = await sql`
    INSERT INTO users ( username, name_color, password)
    VALUES ( ${user.username}, ${user.color}, ${user.password})
    RETURNING id, username, name_color
`;
    res.status(201).json({ message: "Created user", user: newUser });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: err.message });
  }
});

//User logging in auth
userRouter.post("/login", async (req, res) => {
  //auth part
  const { username, password } = req.body;

  // check if the username inputted matches a existing username.
  try {
    const selectedUser =
      await sql`SELECT * FROM users WHERE users.username = ${username}`;

    const user = selectedUser[0];
    if (!selectedUser) {
      return res.status(500).send("user doesn't exist");
    }

    //check if user's form password matches the hashed password
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(200).send("user/pass does not match.");
      } else {
        // JWT authentication

        const accessToken = await jwt.sign(
          user,
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "3600s" }
        );

        return res.status(200).json({ accessToken });
      }
    } catch (err) {
      return res.status(500).send("matching hashes failed");
    }
  } catch (err) {
    return res.status(500).send("failed to look for user");
  }
});

userRouter.get("/test", userControllers.authenticateToken, (req, res) => {
  res.send("hi!");
});

export default userRouter;
