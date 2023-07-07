import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AddReview from "../components/AddReview";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
const API_URL = "http://localhost:5005";

function GamesDetailsPage(props) {
  const storedToken = localStorage.getItem("authToken");

  const { user} = useContext(AuthContext);

  const [game, setGame] = useState(null);
  const { gameId } = useParams();
  const navigate = useNavigate();

  const getGame = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL || API_URL}/api/games/${gameId}`)
      .then((response) => {
        const oneGame = response.data;
        setGame(oneGame);
      })
      .catch((error) => console.log(error));
  };
//DELETE GAME
  const handleDeleteGame = () => {
    console.log('ID game', gameId)
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/games/${gameId}` 
      ,{ headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {

        console.log(response.data);
        // Navigate to the games list page after successful deletion
        navigate("/games");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getGame();
  }, []);

  return (

    <div className="GameDetails">
      <br />
      {game && (
        <>
          {game.game && game.game.cover && game.game.cover.url && (
            <img src={game.game.cover.url} alt="cover" />
          )}
          <h1>Game name: {game.game.name}</h1>
          <p>Summary: {game.game.summary}</p>
          <p>Playable coop campaign: {game.campaigncoop ? "available" : "unavailable"}</p>
          <p>Local coop multiplayer mode: {game.offlinecoop ? "available" : "unavailable"}</p>
          <p>Online multiplayer mode: {game.onlinecoop ? "available" : "unavailable"}</p>
          <p>Maximum online players: {game.onlinemax || 0}</p>
          <p>Maximum offline players: {game.offlinemax || 0}</p>
          <p>{game.review}</p>
          <p>{game.rating}</p>
        </>
      )}
      <ReviewCard refreshGame={getGame} reviews={game?.reviews} />
      <AddReview refreshGame={getGame} gameId={gameId} />
      <Link to="/games">
        <button>Back to games</button>
      </Link>
      {(user && user._id === game?.owner) && <p>Hello {user.name}</p>}
      <Link to={`/games/edit/${gameId}`}>
        <button>Edit Game</button>
      </Link>
      <button onClick={handleDeleteGame}>Delete game</button>
    </div>
  );
}

export default GamesDetailsPage;
