import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../services/auth.services";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [preferences, setPreferences] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  /*   const preferencesEnum = [
    "Online games",
    "Local/offline games",
    "Both online and local",
  ]; */

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleBirth = (e) => setBirth(e.target.value);
  const handlePreferences = (e) => setPreferences(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMessage({});

    const requestBody = { email, password, name, birth, preferences };

    if (!preferences || !email) {
      const error = {};
      if (!email) {
        error.email = "Email is required";
      }
      if (!preferences) {
        error.preferences = "Select your preference";
      }

      setErrorMessage(error);
      return;
    }

    authService.signup(requestBody)
    .then((response) => {
      navigate("/login");
    })
      .catch((error) => {
        console.log(error)
        const errorDescription = error.response.data.message;
        setErrorMessage({ general: errorDescription });
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>
          Email* :{" "}
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          {errorMessage.email && <p> {errorMessage.email} </p>}
        </label>
        <label>Password* : </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <label>
          Name* :{" "}
          <input type="text" name="name" value={name} onChange={handleName} />
        </label>
        <label>Birth:</label>
        <input type="date" name="date" value={birth} onChange={handleBirth} />
      
          <label>
            Preferences:
            <select
              name="preferences"
              value={preferences}
              onChange={handlePreferences}
            >
              <option value="">Select an option </option>
              <option value="Online games">Online games</option>
              <option value="Local/offline games">Local/offline games</option>
              <option value="Both online and local">
                Both online and local
              </option>
            </select>
            {errorMessage.preferences && <p> {errorMessage.preferences} </p>}
          </label>
        <p> All * fields are required</p>
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage.general && (
        <p className="error-message">{errorMessage.general}</p>
      )}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
