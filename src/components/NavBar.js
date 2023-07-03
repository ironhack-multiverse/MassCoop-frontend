import { Link } from "react-router-dom";
//import React from 'react';


function NavBar () {

        return (
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>
      
            <Link to="/games">
              <button>Games</button>
            </Link>

            <Link to="/games/create">
              <button>Add Game</button>
            </Link>
          </nav>
        );
      }
      
      export default NavBar;


