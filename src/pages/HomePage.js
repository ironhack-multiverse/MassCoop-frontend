import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import GameCard from "../components/GameCard";
const API_URL = "http://localhost:5005";

function HomePage() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filterValue, setFilterValue] = useState("");

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
    setFilteredGames(filtered);
  };

  const handleFilterClick = (filterType) => {
    filterGames(filterType);
  };

  return (
    <div>
      <h1>Home Page</h1>
  
      <button onClick={() => handleFilterClick("local")}>Local games</button>
      <button onClick={() => handleFilterClick("online")}>Online games</button>
  
      <ul>
        {filteredGames.map((element) => (
          <div key={element._id}>
            <GameCard {...element.game} {...element} />
            <h3>Name: {element.game?.name}</h3>
            <img src={element.game?.cover?.url} alt={element.game?.name} />
            <button>see details</button>
          </div>
        ))}
      </ul>
    </div>
  );
  
        }
export default HomePage;
