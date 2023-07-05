import { useState, useEffect } from "react";
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
      <h1>Home Page</h1>
      <div className="button-group">
        <button className="btn btn-primary" onClick={() => handleFilterClick("local")}>Local games</button>
        <button className="btn btn-primary" onClick={() => handleFilterClick("online")}>Online games</button>
        <button className="btn btn-primary" onClick={handleGenerateRandomGame}>Generate Random Game</button>
      </div>

      {randomGame ? (
        <div>
          <h2>Randomly Generated Game</h2>
          <p>Name: {randomGame.game.name}</p>
          <p>Summary: {randomGame.game.summary}</p>
        </div>
      ) : (
        <ul>
          {filteredGames.length > 0 && filteredGames.map((game) => (
            <div key={game._id}>
              <GameCard
                name={game.game.name}
                summary={game.game.summary}
                cover={game.game.cover}
                campaigncoop={game.campaigncoop}
                offlinecoop={game.offlinecoop}
                onlinecoop={game.onlinecoop}
                onlinemax={game.onlinemax}
                _id={game._id}
              />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage
