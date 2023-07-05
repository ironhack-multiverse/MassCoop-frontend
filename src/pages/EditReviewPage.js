import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import reviewsService from "../services/reviews.services";


function EditReviewPage(props) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const navigate =  useNavigate();
  const { reviewId } = useParams();
  
  
  useEffect(() => {

    reviewsService.getReview(reviewId)
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

    
    reviewsService.updateReview(reviewId, requestBody)    
      .then((response) => {
        navigate(`/reviews/${reviewId}`)
      });
  };
  
  
  const deleteReview = () => {


    reviewsService.deleteReview(reviewId)        
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

        <button type="submit">Update Review</button>
      </form>

      <button onClick={deleteReview}>Delete Review</button>
    </div>
  );
}

export default EditReviewPage;