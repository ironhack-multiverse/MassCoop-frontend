import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function NavBar({ currentUser }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/games">
        <button>Games</button>
      </Link>

 

      {/*   <Link to="/logout" onClick={handleLogout}>
          Log out
        </Link> */}

       {/*  <>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Log in</Link>
        </>
 */}

      <Link to="/games/create">
              <button>Add Game</button>
            </Link>

            {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>

          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </> )}
    </nav>
  );
}

export default NavBar;

