import { Link } from "react-router-dom";

function GameCard ( { name, summary, _id } ) {
  
  return (
    <div className="GameCard card">
      <Link to={`/games/${_id}`}>
        <h3>{name}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{summary} </p>
    </div>
  );
}

export default GameCard;