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

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response.data.message;
        setErrorMessage({ general: errorDescription });
      });
  };

  return (
    <section class="vh-100">
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style={{ borderRadius: "1rem;" }}>
              <div class="card-body p-5 text-center">
                <h3 class="mb-5">Sign Up</h3>
                <form onSubmit={handleSignupSubmit}>
                  <label class="form-label" for="typeEmailX-2">
                    Email*
                  </label>
                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      name="email"
                      value={email}
                      onChange={handleEmail}
                      class="form-control form-control-lg"
                    />
                    {errorMessage.email && <p> {errorMessage.email} </p>}
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="typePasswordX-2">
                      Password*
                    </label>
                    <input
                      type="password"
                      id="typePasswordX-2"
                      name="password"
                      value={password}
                      onChange={handlePassword}
                      class="form-control form-control-lg"
                    />
                  </div>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="typePasswordX-2">
                      Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleName}
                      class="form-control form-control-lg"
                    />
                  </div>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="typePasswordX-2"> Birth*</label>
    <input type="date" name="date" value={birth} onChange={handleBirth}  class="form-control form-control-lg" />
    </div>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="typePasswordX-2">
                      Preferences*
                    </label>
                    <select
                      name="preferences"
                      value={preferences}
                      onChange={handlePreferences}
                      class="form-control form-control-lg"
                    >
                      <option value="">Select an option </option>
                      <option value="Online games">Online games</option>
                      <option value="Local/offline games">
                        Local/offline games
                      </option>
                      <option value="Both online and local">
                        Both online and local
                      </option>
                    </select>
                    {errorMessage.preferences && (
                      <p> {errorMessage.preferences} </p>
                    )}
                  </div>
                  <p> All * fields are required</p>
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>

                {errorMessage.general && (
                  <p className="error-message">{errorMessage.general}</p>
                )}

                <p>Already have account?</p>
                <Link to={"/login"}> Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
