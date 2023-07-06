import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Form from "react-bootstrap/Form";
import { Button, Container } from "react-bootstrap";

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL || API_URL}/auth/login`,
        requestBody
      )
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate(-1);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <section class="vh-100">
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style={{ borderRadius: "1rem;" }}>
              <div class="card-body p-5 text-center">
                <h3 class="mb-5">Log in</h3>
                <form onSubmit={handleLoginSubmit}>
                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      name="email"
                      value={email}
                      onChange={handleEmail}
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typeEmailX-2">
                      Email
                    </label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      name="password"
                      value={password}
                      onChange={handlePassword}
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typePasswordX-2">
                      Password
                    </label>
                  </div>

                  <button
                    class="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>
                </form>

                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <p>Don't have an account yet?</p>
                <Link to={"/signup"}> Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
