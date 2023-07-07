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

  const { user } = useContext(AuthContext);

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
    console.log("ID game", gameId);
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/games/${gameId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
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
    <div class="detail-card vh-50">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style={{ borderRadius: "1rem;" }}>
          <div className="GameDetails">
            <h1>this is more info</h1>
            <br />
            {game && (
              <>
                {game.game && game.game.cover && game.game.cover.url && (
                  <img src={game.game.cover.url} alt="cover" />
                )}
                <h1><span className="fw-bold badge bg-primary text-wrap">{game.game.name}</span></h1>
                <p><span className="fw-bold badge bg-primary text-wrap">Summary:</span> {game.game.summary}</p>
                <p>
                <span className="fw-bold badge bg-primary text-wrap">Playable coop campaign:</span>{" "}
                  {game.campaigncoop ? "available" : "unavailable"}
                </p>
                <p>
                <span className="fw-bold badge bg-primary text-wrap"> Local coop multiplayer mode:</span>{" "}
                  {game.offlinecoop ? "available" : "unavailable"}
                </p>
                <p>
                <span className="fw-bold badge bg-primary text-wrap"> Online multiplayer mode:</span>{" "}
                  {game.onlinecoop ? "available" : "unavailable"}
                </p>
                <p><span className="fw-bold badge bg-primary text-wrap">Maximum online players: </span>{game.onlinemax || 0}</p>
                <p><span className="fw-bold badge bg-primary text-wrap">Maximum offline players:</span> {game.offlinemax || 0}</p>
                <p>{game.review}</p>
                <p>{game.rating}</p>
              </>
            )}
            <ReviewCard refreshGame={getGame} reviews={game?.reviews} />
            <AddReview refreshGame={getGame} gameId={gameId} />
            <Link to="/games">
              <button>Back to games</button>
            </Link>
            {user && user._id === game?.owner && <p>Hello {user.name}</p>}
            <Link to={`/games/edit/${gameId}`}>
              <button>Edit Game</button>
            </Link>
            <button onClick={handleDeleteGame}>Delete game</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesDetailsPage;
