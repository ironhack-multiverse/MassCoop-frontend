

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

    function DisplayGamesPage() {
        const [games, setGames] = useState([]);
      
        const getAllGames = () => {
          axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/games`)
            .then((response) => setGames(response.data))
            .catch((error) => console.log(error));
        };
      
        // We set this effect will run only once, after the initial render
        // by setting the empty dependency array - []
        useEffect(() => {
          getAllGames();
        }, [] );
      
        return (
            <div className="GameListPage">
              
              <AddGame refreshProjects={getAllGames} />
              
              { projects.map((project) => <GameCard key={project._id} {...project} />  )} 
               
            </div>
          );
        }
        


    return <h1>THIS IS THE GAME PAGE</h1>








}

export default Games