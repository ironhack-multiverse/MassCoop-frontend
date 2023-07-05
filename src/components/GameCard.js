import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function GameCard({ name, summary, cover, campaigncoop, offlinecoop, onlinecoop, onlinemax }) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate(); 


  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };
  const handleRedirectClick = (gameId) => {
    navigate(`/games/${gameId._id}`);
  };

  return (
    <div className="card">
      <h3 className="card-title">{name}</h3>
      {cover && <img src={cover.url} alt={name} className="card-img-top" />}
     
      <div className="card-body">
      <h5 className="card-title">{name}</h5>

      <button className="btn btn-primary"  onClick={handleDetailsClick}>{showDetails ? "Hide Details" : "Show Details"}</button>
      {showDetails && (
        <div className="card-text">

<p className="summary">{summary}</p>
          <p>Campaign Co-op: {campaigncoop ? "Yes" : "No"}</p>
          <p>Offline Co-op: {offlinecoop ? "Yes" : "No"}</p>
          <p>Online Co-op: {onlinecoop ? "Yes" : "No"}</p>
          <p>Online Max Players: {onlinemax}</p>
          <button onClick={handleRedirectClick}> See more details</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default GameCard;
