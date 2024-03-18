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

// get book
app.get("/book/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const bookResult = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    const book = bookResult.rows[0];

    if (book) {
      const notesResult = await db.query("SELECT * FROM booknotes WHERE book_id = $1", [
        id,
      ]);
      const notes = notesResult.rows;

      return res.json({ message: "success", book: book, notes: notes });
    } else {
      return res.json({ message: "error" });
    }
  } catch (err) {
    console.log("Internal server error.", err);
    return res.json({ message: "error" });
  }
});

// admin auth
// register
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const check = await db.query("SELECT * FROM admin_user");
    if (check.rows.length > 0) {
      return res.json({ message: "error" });
    } else {
      bcrypt.hash(password, saltround, async (err, hash) => {
        if (err) {
          console.log("Can't hash password.", err);
          return res.json({ message: "error" });
        }

        const result = await db.query(
          "INSERT INTO admin_user (username, password) VALUES ($1, $2) RETURNING id, username",
          [username, hash]
        );
        const data = result.rows[0];
        const token = jwt.sign(
          {
            id: data.id,
            username: data.username,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        return res.json({ message: "success", token: token });
      });
    }
  } catch (err) {
    console.log("Internal server error.", err);
    return res.json({ message: "error" });
  }
});

// login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM admin_user WHERE username = $1", [
      username,
    ]);
    const data = result.rows[0];

    if (data) {
      bcrypt.compare(password, data.password, (err, isMatched) => {
        if (err) {
          console.log("Can't compare passwords.", err);
          return res.json({ message: "error" });
        }

        if (isMatched) {
          const token = jwt.sign(
            {
              id: data.id,
              username: data.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
          );
          return res.json({ message: "success", token: token });
        } else return res.json({ message: "error" });
      });
    } else return res.json({ message: "error" });
  } catch (err) {
    console.log("Internal server error.", err);
    return res.json({ message: "error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
