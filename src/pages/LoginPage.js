import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

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
    <Form>
      <h1>Login</h1>

      <Form.Group  className="mb-3" controlId="formGroupEmail" onSubmit={handleLoginSubmit}>
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" name="email" value={email} onChange={handleEmail} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        /></Form.Group>  

        <Button variant="danger" size="lg" type="submit">Login</Button>
   
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> <Button variant="danger"> Sign Up</Button></Link>
      
      </Form>
  );
}

export default LoginPage;
