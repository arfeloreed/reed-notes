import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
// components
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import AddNote from "../components/AddNote";
import ScrollToTopBtn from "../components/ScrollToTopBtn";

function BookDetail() {
  // variables
  const { id } = useParams();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const [book, setBook] = useState({});
  const [notes, setNotes] = useState([]);
  const isAuth = useIsAuthenticated();

  // helper functions
  async function getBook() {
    try {
      const response = await axios.get(`${url}/book/${id}`);

      if (response.data.message === "success") {
        const fetchBook = response.data.book;
        fetchBook.date_read = new Date(fetchBook.date_read);
        setBook(fetchBook);
      } else {
        navigate("/error");
      }
    } catch (err) {
      console.log("Can't fetch book: ", err);
    }
  }

  async function getNotes() {
    try {
      const response = await axios.get(`${url}/book/${id}/notes`);

      if (response.data.message === "success") {
        setNotes(response.data.notes);
      }
    } catch (err) {
      console.log("Can't fetch notes: ", err);
    }
  }

  useEffect(() => {
    getBook();
    getNotes();
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="bookDetailPage">
      <Navbar />

      <div className="container text-light py-5">
        <div className="text-center mt-5">
          <h1 className="display-1 my-5">{book.title}</h1>
          <img
            src={`https://covers.openlibrary.org/b/olid/${book.olid}-L.jpg`}
            alt={book.title}
            className="bookImg"
          />

          <div className="mt-5 lead fw-normal">
            <p>Author: {book.author}</p>
            <p>OLID: {book.olid}</p>
            <p>
              Read on: {book.date_read instanceof Date && book.date_read.toDateString()}
            </p>
            <p>My Rating: {book.rating}/10 ⭐</p>
            <p className="mx-auto" style={{ maxWidth: "550px" }}>
              {book.description}
            </p>
          </div>
        </div>

        <div className="notesCon">
          <p className="h1">My Notes:</p>

          <div className="notes mt-4">
            {notes.map((note) => {
              return <Note key={note.id} note={note.note} />;
            })}
          </div>

          {isAuth() && <AddNote updateNotes={getNotes} />}
        </div>
      </div>

      <ScrollToTopBtn />
    </div>
  );
}

export default BookDetail;
