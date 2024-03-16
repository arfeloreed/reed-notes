import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// components
import Navbar from "../components/Navbar";

function BookDetail() {
  // variables
  const { id } = useParams();
  const navigate = useNavigate();

  // helper functions
  async function getBook() {}

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
