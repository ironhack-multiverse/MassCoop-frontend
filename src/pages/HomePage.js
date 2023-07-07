import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import GameCard from "../components/GameCard";

const API_URL = "http://localhost:5005";

function HomePage() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [randomGame, setRandomGame] = useState(null);

  useEffect(() => {
    refreshGames();
  }, []);

  const refreshGames = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL || API_URL}/api/games`)
      .then((response) => {
        setGames(response.data);
        setFilteredGames(response.data);
      })
      .catch((error) => console.log(error));
  };

  const filterGames = (filterType) => {
    let filtered = [];
    if (filterType === "local") {
      filtered = games.filter((game) => game.offlinecoop === true);
    } else if (filterType === "online") {
      filtered = games.filter((game) => game.onlinecoop === true);
    } else {
      filtered = games;
    }
    setRandomGame(null);
    setFilteredGames(filtered);
  };

  const handleFilterClick = (filterType) => {
    filterGames(filterType);
  };

  const handleGenerateRandomGame = () => {
    if (filteredGames.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredGames.length);
      const randomGame = filteredGames[randomIndex];
      setRandomGame(randomGame);
    } else if (games.length > 0) {
      const randomIndex = Math.floor(Math.random() * games.length);
      const randomGame = games[randomIndex];
      setRandomGame(randomGame);
    }
  };

  return (
    <div>
      <div className='banner'>

      <div>
          <h1 className ="slogan">Struggling to find multiplayer games?<br/> We gotch ya!</h1>
        </div>
        
        <div className="button-group">
          <button
            className="btn btn-primary btn-lg mr-3 custom-button"
            onClick={() => handleFilterClick("local")}
          >
            Local games
          </button>
          <button
            className="btn btn-primary btn-lg custom-button secondary"
            onClick={() => handleFilterClick("online")}
          >
            Online games
          </button>
          <button className="btn btn-primary btn-lg custom-button tertiary m" onClick={handleGenerateRandomGame}>
            I am feeling lucky!
          </button>
        </div>
        
      </div>
    
  
      <div className="container">
        <div className="image-container"></div>
        {randomGame ? (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h2>Here is your game!</h2>
            <GameCard
              name={randomGame.game.name}
              cover={randomGame.game.cover}
              summary={randomGame.game.summary}
              campaigncoop={randomGame.campaigncoop}
              offlinecoop={randomGame.offlinecoop}
              onlinecoop={randomGame.onlinecoop}
              onlinemax={randomGame.onlinemax}
              _id={randomGame._id}
            />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredGames.length > 0 &&
              filteredGames.map((game) => (
                <div key={game._id}>
                  <GameCard
                    cover={game.game.cover}
                    name={game.game.name}
                    summary={game.game.summary}
                    campaigncoop={game.campaigncoop}
                    offlinecoop={game.offlinecoop}
                    onlinecoop={game.onlinecoop}
                    onlinemax={game.onlinemax}
                    _id={game._id}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
              }
export default HomePage;