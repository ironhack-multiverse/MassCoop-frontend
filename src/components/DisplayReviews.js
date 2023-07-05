/* 
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";

function DisplayReviews() {


        function DisplayGamesPage() {
            const [reviews, setReviews] = useState(null);
          
            const getAllReviews = () => {
              axios
                .get(`${process.env.REACT_APP_SERVER_URL}/api/reviews`)
                .then((response) => 
               setReviews(response.data))
               .catch((error) => console.log(error));
    
            };
          
            // We set this effect will run only once, after the initial render
            // by setting the empty dependency array - []
            useEffect(() => {
              getAllReviews();
            }, [] );
    
    
            return (
                
                <section className="ReviewsList">
                <h1>Displaying reviews</h1>
              
                  {reviews && reviews.map((element) => (
                    <div key={element._id}>
                      <ReviewCard  {...element.reviews}  { ...reviews}/>
                      <h3> Name: {element.review?.comment}</h3>
                      <h3> Rating: {element.review?.rating}</h3>
                        
           
                      
                      <Link to={`/games/${element._id}`}>More details</Link>
                    </div>
                  ))} 
                </section>
              );}
              
    
    
    }

export default DisplayReviews; */