import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// components
import Navbar from "../components/Navbar";

function BookDetail() {
  // variables
  const { id } = useParams();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const [book, setBook] = useState({});
  const [notes, setNotes] = useState([]);

  // helper functions
  async function getBook() {
    try {
      const response = await axios.get(`${url}/book/${id}`);
      if (response.data.message === "success") {
        setBook(response.data.book);
        setNotes(response.data.notes);
      } else {
        navigate("/error");
      }
    } catch (err) {
      console.log("Can't fetch data: ", err);
    }
  }

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div className="bookDetailPage">
      <Navbar />

      <div className="container text-light">
        <h1>Book detail page</h1>
      </div>
    </div>
  );
}

export default BookDetail;
