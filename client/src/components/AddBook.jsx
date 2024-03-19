import React, { useState } from "react";
import axios from "axios";

function AddBook({ updateBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [olid, setOlid] = useState("");
  const [rating, setRating] = useState("");
  const [date_read, setDate_read] = useState("");
  const [description, setDescription] = useState("");
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const [error, setError] = useState("");

  // helper functions
  async function handleSubmit() {
    const data = {
      title,
      author,
      rating,
      date_read,
      olid,
      description,
    };

    try {
      const response = await axios.post(`${url}/books`, data);
      console.log(response);

      if (response.data.message === "success") {
        setError("");
        setTitle("");
        setAuthor("");
        setOlid("");
        setRating("");
        setDate_read("");
        setDescription("");
        updateBooks();
      } else setError("Can't add book.");
    } catch (err) {
      console.log("Can't add book: ", err);
    }
  }

  return (
    <div>
      <form
        className="addBookForm p-5 mt-5 mx-auto rounded-3"
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSubmit();
        }}
      >
        <h2 className="mb-3">Add a book</h2>

        {error && <p className="text-danger mb-3">{error}</p>}

        <div className="inputBox">
          <input
            type="text"
            name="title"
            id="title"
            required
            autoComplete="off"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <label htmlFor="title">Title</label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            name="author"
            id="author"
            required
            autoComplete="off"
            value={author}
            onChange={(ev) => setAuthor(ev.target.value)}
          />
          <label htmlFor="author">Author</label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            name="olid"
            id="olid"
            required
            autoComplete="off"
            value={olid}
            onChange={(ev) => setOlid(ev.target.value)}
          />
          <label htmlFor="olid">OLID</label>
        </div>

        <div className="inputBox2">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            name="rating"
            id="rating"
            required
            min={1}
            max={10}
            step={0.1}
            value={rating}
            onChange={(ev) => setRating(ev.target.value)}
          />
        </div>

        <div className="inputBox2">
          <label htmlFor="date">Date read</label>
          <input
            type="date"
            name="date"
            id="date"
            required
            value={date_read}
            onChange={(ev) => setDate_read(ev.target.value)}
          />
        </div>

        <div className="inputBox2">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="6"
            required
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          ></textarea>
        </div>

        <input
          className="btn btn-outline-success btn-lg px-5 mt-3"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}

export default AddBook;
