import React from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import useLogInContext from "../../hooks/useLogInContext";

function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { dispatch } = useLogInContext();
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    window.localStorage.setItem(
      "credentials",
      JSON.stringify({ email, password })
    );
    dispatch({ type: "login" });
    navigate("/moviesList");
  }

  return (
    <div className={styles.singupWrapper}>
      <h1>Create your Account</h1>
      <form className={styles.signupForm} onSubmit={handleSignup}>
        <label htmlFor="email">Email</label>
        <input
          placeholder="Enter"
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
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
        <button type="submit">Create Account</button>
      </form>
      <div className={styles.signup__login}>
        <p>
          Have an Account? <Link to="/login">LOGIN</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
