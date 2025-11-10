import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";

const userRouter = express.Router();

//Adding users
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
      return res.send("user doesn't exist");
    }

    //check if user's form password matches the hashed password
    try {
      console.log(password);
      console.log(user.password);
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.send("user/pass does not match.");
      } else {
        // do JWT thing here
        return res.status(200).send("password matches");
      }
    } catch (err) {
      return res.send("matching hashes failed");
    }
  } catch (err) {
    return res.send("bad");
  }
});

export default userRouter;
