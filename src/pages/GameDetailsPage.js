import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddReview from "../components/AddReview";
//import gamesService from "../services/games.services";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
const API_URL = "http://localhost:5005";

function GamesDetailsPage(props) {
  const [game, setGame] = useState(null);
  const { gameId } = useParams();

  const getGame = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL || API_URL}/api/games/${gameId}`
        // { headers: { Authorization: `Bearer ${storedToken}` } }
      )

      // gamesService.getGame(gameId)
      .then((response) => {
        const oneGame = response.data;
        setGame(oneGame);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getGame();
  }, []);
  console.log(game);

  return (
    <div className="GameDetails">
      {" "}
      <br />
      {game && (
        <>
          <img src={game.game.cover.url} alt="cover" />

          <h1>Game name: {game.game.name}</h1>
          <p>Summary :{game.game.summary}</p>
          <p>
            Playable coop campaign :{" "}
            {game.campaigncoop ? "available" : "unavailable"}
          </p>
          <p>
            Local coop multiplayer mode :{" "}
            {game.offlinecoop ? "available" : "unavailable"}
          </p>
          <p>
            Online multiplayer mode :{" "}
            {game.onlinecoop ? "available" : "unavailable"}
          </p>
          <p>Maximum online players : {game.onlinemax || 0}</p>
          <p>Maximum offline players : {game.offlinemax || 0}</p>
          <p>{game.review}</p>
          <p>{game.rating}</p>
        </>
      )}
      <ReviewCard refreshGame={getGame} reviews={game?.reviews}/>
      <AddReview refreshGame={getGame} gameId={gameId} />
      <Link to="/games">
        <button>Back to games</button>
      </Link>
      <Link to={`/games/edit/${gameId}`}>
        <button>Edit Game</button>
      </Link>
    </div>
  );
}

export default GamesDetailsPage;
