import React from "react";
import "./Navbar.css";
import { LuListTodo } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <b>
              <LuListTodo /> todo
            </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About Us
                </Link>
              </li>

              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active nav-btn" to="/signup">
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active nav-btn" to="/signin">
                      SignIn
                    </Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <div className="d-flex">
                   <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/todo"
                >
                  Todo
                </Link>
              </li>
              <li className="nav-item">
                  <button
                    className="nav-link active nav-btn btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
