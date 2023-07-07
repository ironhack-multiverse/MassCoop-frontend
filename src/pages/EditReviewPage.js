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

    reviewsService
      .updateReview(reviewId, requestBody)
      .then((response) => navigate(-1))
      .catch((err) => console.log(err));
  };

  const deleteReview = () => {
    reviewsService
      .deleteReview(reviewId)
      .then(() => navigate("/reviews"))
      .catch((err) => console.log(err));
  };

  return (
    <div class="detail-card pt-0 pb-0">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style={{ borderRadius: "1rem;" }}>
          <div className="EditReviewPage pt-5 pb-5">
            <h3>Edit the Review</h3>

            <form onSubmit={handleFormSubmit}>
              <label>Comment:</label> {"  "}
              <textarea
                type="text"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />{" "}
              <br />
              <label>Rating:</label> {"  "}
              <input
                type="number"
                min="1"
                max="10"
                name="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />{" "}
              <br />
              <br />
              {isLoggedIn && <button className="btn btn-primary" type="submit">Update Review</button>}
            </form>
            <br />
            {isLoggedIn && (
              <button className="btn btn-primary" onClick={deleteReview}>Delete Review</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditReviewPage;
