import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import reviewsService from "../services/reviews.services";
import { AuthContext } from "../context/auth.context";

function EditReviewPage(props) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();
  const { reviewId } = useParams();
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  useEffect(() => {
    reviewsService
      .getReview(reviewId)
      .then((response) => {
        const oneReview = response.data;
        setComment(oneReview.comment);
        setRating(oneReview.rating);
      })
      .catch((error) => console.log(error));
  }, [reviewId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { comment, rating };

    reviewsService.updateReview(reviewId, requestBody).then((response) => {
      navigate(-1);
    });
  };

  const deleteReview = () => {
    reviewsService
      .deleteReview(reviewId)
      .then(() => navigate("/reviews"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditReviewPage">
      <h3>Edit the Review</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Comment:</label>
        <textarea
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <label>Rating:</label>
        <input
          name="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        {isLoggedIn && <button type="submit">Update Review</button>}
      </form>

      {isLoggedIn && <button onClick={deleteReview}>Delete Review</button>}
    </div>
  );
}

export default EditReviewPage;
