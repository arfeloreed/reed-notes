import React from "react";
import { useNavigate } from "react-router-dom";

function Book({ id, title, isbn, author, rating, description }) {
  const navigate = useNavigate();

  return (
    <div className="book mt-5 row row-cols-1 row-cols-md-2 p-5 rounded-3">
      <div className="col d-flex justify-content-center mb-5 mb-md-0">
        <img src={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`} alt={title} />
      </div>

      <div className="col d-flex flex-column align-items-start justify-content-center">
        <h2 className="display-4">{title}</h2>
        <p>by {author}</p>
        <p>Rating: {rating} ⭐</p>
        <p>{description}</p>
        <button
          className="btn btn-outline-light btn-lg px-5 mt-4"
          type="button"
          onClick={() => navigate(`/book/${id}`)}
        >
          Read Notes
        </button>
      </div>
    </div>
  );
}

export default Book;
