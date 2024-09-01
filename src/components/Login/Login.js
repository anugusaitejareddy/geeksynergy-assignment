import React from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { LogInContext } from "../../context/LogInContext";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [authErrors, setAuthErrors] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { dispatch } = React.useContext(LogInContext);

  function handleLogin(e) {
    e.preventDefault();

    let credentials = JSON.parse(window.localStorage.getItem("credentials"));

    if (credentials.email === email) {
      if (credentials.password === password) {
        window.localStorage.setItem("isLoggedIn", true);
        dispatch({ type: "login" });
        navigate("/moviesList");
      } else {
        setAuthErrors({ email: "", password: "Incorrect Password" });
      }
    } else {
      setAuthErrors({ email: "User not found", password: "" });
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <h1>Login</h1>
      <p>Welcome back</p>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <label htmlFor="email">
          Email
          <input
            placeholder="Enter"
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {authErrors.email && (
          <div className={styles.loginError}>{authErrors.email}</div>
        )}
        <label htmlFor="password">
          Password
          <input
            placeholder="Enter"
            type="password"
            name="password"
            id="password"
            value={password}
            required
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {authErrors.password && (
          <div className={styles.loginError}>{authErrors.password}</div>
        )}
        <button type="submit">Login</button>
      </form>
      <div className={styles.login__signup}>
        <p>
          Don't have an Account? <Link to="/">SIGN UP</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
