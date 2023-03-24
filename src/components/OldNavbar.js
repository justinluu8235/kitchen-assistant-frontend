import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const { handleLogout, user } = props;
  // const { id, username, email, exp } = user;
  // console.log(username == null)

  return (
    <nav>
        <a class="navbar-item" href="/">
          {" "}
          <h1 class="app-title">Kitchen Assistant</h1>{" "}
        </a>

        <div class="nav-auth-container">
          {props.isAuth ? (
            <div class="nav-auth-container">
              <div>
                <a
                  className="nav-link"
                  href="/profile/"
                  style={{ color: "white" }}
                >
                  Profile
                </a>
                <a class="navbar-item" href="/recipes">
                  {" "}
                  My Recipes{" "}
                </a>
                <a  class="navbar-item" href="/menu"> Menu </a>
                <a class="navbar-item" href="/shoppingList">
                  {" "}
                  Shopping List{" "}
                </a>
                <a class="navbar-item" href="/pantry">
                  {" "}
                  Pantry{" "}
                </a>
                <a class="navbar-item" href="/searchRecipes">
                  {" "}
                  Search Recipes{" "}
                </a>
                <a class="navbar-item" href="/userFriends">
                  My Friends
                </a>
              </div>

              <div>
                <span
                  onClick={props.handleLogout}
                  className="nav-link logout-link"
                  style={{ color: "white" }}
                >
                  Logout
                </span>
              </div>
            </div>
          ) : (
            <div class="nav-auth-container">
              <a
                className="nav-link"
                href="/signup/"
                style={{ color: "white" }}
              >
                Signup
              </a>

              <a className="nav-link" href="/login/" style={{ color: "white" }}>
                Login
              </a>
            </div>
          )}
        </div>

        <div class="nav-username">
          {user && user["username"] && (
            <p class="nav-text">Signed in as: {user["username"]}</p>
          )}
        </div>

    </nav>
  );
};

export default Navbar;
