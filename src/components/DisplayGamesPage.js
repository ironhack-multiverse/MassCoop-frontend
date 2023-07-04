

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddGame from "./AddGame";
import GameCard from "./GameCard";

    function DisplayGamesPage() {
        const [games, setGames] = useState(null);
      
        const getAllGames = () => {
          axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/games`)
            .then((response) => 
           setGames(response.data))
           .catch((error) => console.log(error));

        };
      
        // We set this effect will run only once, after the initial render
        // by setting the empty dependency array - []
        useEffect(() => {
          getAllGames();
        }, [] );


        return (
            <section className="GamesList">
              <h1>Games List</h1>
          
              {games && games.map((element) => (
                <div key={element._id}>
                  <GameCard  {...element.game}  { ...element}/>
                  <h3> Name: {element.game?.name}</h3>
                   <img src={element.game?.cover?.url} alt={element.name} /> 
       {/*    
                  
                  <Link to={`/games/${element._id}`}>More details</Link> */}
                </div>
              ))} 
            </section>
          );}
          


export default DisplayGamesPage;