
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ReviewCard() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  const getGame = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/games/${gameId}`)
      .then((response) => {
        setGame(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getGame();
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <section className="GamesList">
      <h1>Reviews</h1>

      {game.reviews.map((review) => (
        <div key={review._id}>
          <h3>Review: {review.comment}</h3>
          <h3>Rating: {review.rating}</h3>
        </div>
      ))}
    </section>
  );
}

export default ReviewCard;
