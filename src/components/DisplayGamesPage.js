import { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayGamesPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await axios.get('/api/games');
        setGames(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getGames();
  }, []);

  return (
    <div className="DisplayGamesPage">
      <h1>List of Games</h1>
      {games.map((game) => (
        <div key={game._id}>
          <h2>{game.name}</h2>
          <p>Description: {game.summary}</p>
          <p>Campain in coop : {game.campaigncoop}</p>
          {/* Display other game properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default DisplayGamesPage;
