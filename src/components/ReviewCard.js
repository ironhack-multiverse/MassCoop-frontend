import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import reviewsService from "../services/reviews.services";
import { computeHeadingLevel } from "@testing-library/react";

function ReviewCard(props) {
  const { gameId } = useParams();
  const { reviewId } = useParams();
  const [game, setGame] = useState(null);

  // const getGame = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_SERVER_URL}/api/games/${gameId}`)
  //     .then((response) => {
  //       setGame(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // useEffect(() => {
  //   getGame();
  // }, []);

  // if (!game) {
  //   return <div>Loading...</div>;
  // }
  // useEffect(() => {}, [props.reviews])
  const handleDelete = (id) => {
    reviewsService
      .deleteReview(id)
      .then(() => props.refreshGame())
      .catch((e) => console.log(e));
  };

  return (
    <section className="GamesList">
      <h1>Reviews</h1>

      {props.reviews?.map((review) => (
        <div key={review._id}>
          <h3>Review: {review.comment}</h3>
          <h3>Rating: {review.rating}</h3>

          <Link to={`/reviews/edit/${review._id}`}>
            <button>Edit Review</button>
          </Link>

          <button onClick={() => handleDelete(review._id)}>
            Delete Review
          </button>
        </div>
      ))}
    </section>
  );
}

export default ReviewCard;
