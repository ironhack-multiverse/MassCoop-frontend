import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { useParams } from "react-router-dom";


function GameCard({ _id, name, summary, cover, campaigncoop, offlinecoop, onlinecoop, onlinemax }) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate(); 


  const handleDetailsClick = () => {
   setShowDetails(!showDetails);
   };

  return (
    <div  className="card" style={{width: "18rem"}} >
      <div >
        <div className="card-body" >
          <div className="col-4 ">
      <h4 className="card-title">{name}</h4>
      {cover && <img className="card-img-top"  src={cover.url} alt={name} />}
     
<br />
      <button className="btn btn-primary"  onClick={handleDetailsClick}>{showDetails ? "Hide Details" : "Show Details"}</button>
      {showDetails && (
        <div className="card-text">

<p className="summary">{summary}</p>
          <p>Campaign Co-op: {campaigncoop ? "Yes" : "No"}</p>
          <p>Offline Co-op: {offlinecoop ? "Yes" : "No"}</p>
          <p>Online Co-op: {onlinecoop ? "Yes" : "No"}</p>
          <p>Online Max Players: {onlinemax}</p>
          <Link to={`/games/${_id}`}><h3>See more details</h3>
      </Link>        
      </div>
      )}
    </div>
    </div>
    </div>
    </div>
  );
}

export default GameCard;
