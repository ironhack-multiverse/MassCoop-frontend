import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AddReview(props) {
  const [comment, setComment] = useState([]);
  const [rating, setRating] = useState(0);
  const { gameId } = useParams();
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleComment = (e) => setComment(e.target.value);
  const handleRating = (e) => setRating(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      comment,
      rating,
    };

    console.log(requestBody);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL || API_URL}/api/reviews/${gameId}`,
        requestBody,
        {}
      )
      .then((response) => {
        setComment([]);
        setRating(0);
        props.refreshGame();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div class="detail-card vh-50">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
      <div class="card shadow-2-strong" style={{ borderRadius: "1rem;" }}>
    <div className="AddReview">
      <h3>Add Review : </h3>{" "}
      <form onSubmit={handleSubmit}>
        <label>Review </label>{" "}
        <textarea
          type="text"
          name="comment"
          value={comment}
          onChange={handleComment}
        />
        <br />
        <label>Rating </label>{" "}
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={handleRating}
        />
        {isLoggedIn && <button type="submit">Submit</button>}
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}

export default AddReview;
