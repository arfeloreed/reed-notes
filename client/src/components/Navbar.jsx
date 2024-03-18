import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = useIsAuthenticated();
  const logout = useSignOut();

  return (
    <nav className="navbar navbar-expand-lg text-bg-success">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Reed's Notes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#myNav"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className="collapse navbar-collapse" id="myNav">
          <ul className="navbar-nav nav-underline ms-auto align-items-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/books" className="nav-link">
                BOOKS
              </NavLink>
            </li>
            {isAuth() && (
              <li className="nav-item">
                <a
                  href={`${location.pathname}`}
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={(ev) => {
                    ev.preventDefault();
                    logout();
                    navigate(`${location.pathname}`);
                  }}
                >
                  LOGOUT
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
