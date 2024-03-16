import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// variables
const app = express();
const port = parseInt(process.env.SERVER_PORT) || 5000;
const saltround = parseInt(process.env.SALTROUND);

// middlewares
app.use(cors());
app.use(express.json());

// db setup
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

// routes
// get all books
app.get("/books", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books");
    const data = result.rows;

    return res.json({ message: "success", data: data });
  } catch (err) {
    console.log("Internal server error.", err);
    return res.json({ message: "error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
