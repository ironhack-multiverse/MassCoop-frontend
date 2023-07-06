import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import reviewsService from "../services/reviews.services";
import { computeHeadingLevel } from "@testing-library/react";
import { AuthContext } from "../context/auth.context";


function ReviewCard(props) {
  const { gameId } = useParams();
  const { reviewId } = useParams();
  const [game, setGame] = useState(null);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

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
            {isLoggedIn && <button>Edit Review</button>}
          </Link>

          {isLoggedIn && (
            <button onClick={() => handleDelete(review._id)}>
              Delete Review
            </button>
          )}
        </div>
      ))}
    </section>
  );
}

export default ReviewCard;
