import { Link } from "react-router-dom";

function NavBar({ currentUser }) {
  const handleLogout = () => {
    
    console.log("Logout action triggered");
  };

        return (
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>
      
            <Link to="/games">
              <button>Games</button>
            </Link>
          </nav>
        );
      }
      
      export default NavBar;

