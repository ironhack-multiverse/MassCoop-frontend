import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddReview(props) {
  const [comment, setComment] = useState([]);
  const [rating, setRating] = useState(0);
  const { gameId } = useParams();

  const handleComment= (e) => setComment(e.target.value);
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
       // props.refreshGames();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="AddReview">
      <h3>Add Review : </h3> {" "}
      <form onSubmit={handleSubmit}>
        <label>Review </label> {" "}
        <textarea type="text" name="comment" value={comment} onChange={handleComment} />
        <br />
        <label>Rating </label> {" "}
        <input type="number" name="rating" value={rating} onChange={handleRating} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddReview;
