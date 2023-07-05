import React, { useState } from "react";

function GameCard({ name, summary, cover, campaigncoop, offlinecoop, onlinecoop, onlinemax }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="GameCard">
      <h3>{name}</h3>
      {cover && <img src={cover.url} alt={name} />}
      <button onClick={handleDetailsClick}>{showDetails ? "Hide Details" : "Show Details"}</button>
      {showDetails && (
        <div>
          <p>Summary: {summary}</p>
          <p>Campaign Co-op: {campaigncoop ? "Yes" : "No"}</p>
          <p>Offline Co-op: {offlinecoop ? "Yes" : "No"}</p>
          <p>Online Co-op: {onlinecoop ? "Yes" : "No"}</p>
          <p>Online Max Players: {onlinemax}</p>
        </div>
      )}
    </div>
  );
}

export default GameCard;
