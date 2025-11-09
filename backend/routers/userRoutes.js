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

export default userRouter;
