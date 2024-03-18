import React, { useEffect, useState } from "react";
import axios from "axios";
// components
import Navbar from "../components/Navbar";
import Book from "../components/Book";

function Books() {
  // variables
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const [filteredBooks, setFilteredBooks] = useState([]);

  // helper functios
  // getting all books
  async function getBooks() {
    try {
      const response = await axios.get(`${url}/books`);
      if (response.data.message === "success") {
        setFilteredBooks(response.data.data);
      }
    } catch (err) {
      console.log("Can't fetch data: ", err);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  // handling filter of books
  function handleSort(sortBy) {
    if (sortBy === "newest") {
      setFilteredBooks(
        [...filteredBooks].sort((a, b) => {
          return b.id - a.id;
        })
      );
    }
    if (sortBy === "title") {
      setFilteredBooks(
        [...filteredBooks].sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        })
      );
    }
    if (sortBy === "rating") {
      setFilteredBooks(
        [...filteredBooks].sort((a, b) => {
          return b.rating - a.rating;
        })
      );
    }
  }

  return (
    <div className="booksPage">
      <Navbar />

      <div className="container text-light">
        <div className="mt-5">
          <h1 className="display-2">Reed's Notes</h1>
          <p className="lead mt-4 fs-4">
            See the collection of all the books I've read. The notes are personal and
            solely depends based on my interpretation of what I've read. They are not
            meant to be taken for educational purposes. I will continue to update this
            page as I read more. Book covers are from the{" "}
            <a
              className="link-warning link-offset-2"
              href="https://openlibrary.org/"
              target="_blank"
              rel="noreferrer"
            >
              openlibrary.org
            </a>
            .
          </p>
        </div>

        <div className="mt-5">
          <p className="lead">Filter by:</p>

          <div className="filterCon d-flex">
            <button
              type="button"
              className="py-2 px-4"
              value="newest"
              onClick={(ev) => handleSort(ev.target.value)}
            >
              Newest
            </button>
            <button
              type="button"
              className="py-2 px-4"
              value="title"
              onClick={(ev) => handleSort(ev.target.value)}
            >
              Title
            </button>
            <button
              type="button"
              className="py-2 px-4"
              value="rating"
              onClick={(ev) => handleSort(ev.target.value)}
            >
              Rating
            </button>
          </div>
        </div>

        <div className="booksCon py-5 px-2 px-md-0">
          {filteredBooks.map((book) => {
            return (
              <Book
                key={book.id}
                id={book.id}
                title={book.title}
                isbn={book.isbn}
                author={book.author}
                rating={book.rating}
                description={book.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Books;
