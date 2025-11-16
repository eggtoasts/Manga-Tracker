import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

// middleware for getting the token
async function authenticateToken(req, res, next) {
  // auth header : Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).send("No Token");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.send("You have no access.");
    req.user = user;
    next();
  });
}

const userControllers = {
  authenticateToken,
};

export default userControllers;
