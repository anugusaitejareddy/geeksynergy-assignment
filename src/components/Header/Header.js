import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import styles from "./Header.module.css";
import { LogInContext } from "../../context/LogInContext";

function Header() {
  const {
    userStatus: { isLoggedIn },
    dispatch,
  } = React.useContext(LogInContext);

  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.setItem("isLoggedIn", false);
    dispatch({ type: "logout" });
    navigate("/");
  }

  return (
    <nav className={styles.headerNav}>
      <div className={styles.logo}>Logo</div>
      <ul>
        {isLoggedIn === true ? (
          <>
            <li onClick={handleLogout}>Log out</li>
            <li>
              <NavLink to="/moviesList">Movies List</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/">Sign Up</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
