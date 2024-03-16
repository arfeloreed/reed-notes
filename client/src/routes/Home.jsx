import React from "react";
import {
  faSquareXTwitter,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
// assets
import homeGif from "../assets/images/homeGif.gif";
// components
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="homeCon">
      <Navbar />

      <div
        className="container text-light d-flex align-items-center justify-content-center z-1 position-relative"
        style={{ minHeight: "93vh" }}
      >
        <div className="row row-cols-1 row-cols-md-2 my-5 my-md-0">
          <div className="col">
            <p className="h3">Reed's</p>
            <h1 className="display-1 fw-medium mb-5">Notes</h1>
            <p className="lead mb-5">
              A collection of all the notes from books I read. Have fun reading the notes
              of some books you might fancy. I will constantly update this site as I read
              more.
            </p>

            <button
              className="btn btn-success btn-lg px-5 text-uppercase text-dark"
              onClick={() => navigate("/books")}
            >
              See all books
            </button>

            <div className="mt-5">
              <p className="mb-2 h5">Get in touch:</p>
              <div className="socials">
                <a
                  href="https://twitter.com/ReedTorralba"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faSquareXTwitter} />
                </a>
                <a
                  href="https://www.instagram.com/reedtorz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.linkedin.com/in/arfeloreed/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href="https://github.com/arfeloreed" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          </div>

          <div className="col d-flex justify-content-center mt-5 mt-md-0">
            <img src={homeGif} alt="writing note gif" className="homeGif" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
