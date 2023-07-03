import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddGame(props) {
  const [game, setGame] = useState("");
  const [summary, setSummary] = useState("");
  const [campaigncoop, setCampaigncoop] = useState("");
  const [offlinecoop, setOfflinecoop] = useState("");
  const [onlinecoop, setOnlinecoop] = useState("");
  const [onlinemax, setOnlinemax] = useState(0);
  
  
  const handleGame = (e) => setGame(e.target.value);
  const handleSummary = (e) => setSummary(e.target.value);
  const handleCampaigncoop = (e) => setCampaigncoop (e.target.value);
  const handleOfflinecoop = (e) => setOfflinecoop(e.target.value);
  const handleOnlinecoop = (e) => setOnlinecoop(e.target.value);
  const handleOnlinemax = (e) => setOnlinemax(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      game,
      summary,
      campaigncoop,
      offlinecoop,
      onlinecoop,
      onlinemax,
    };



    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/api/games`, requestBody, {
      })
      .then((response) => {
        setGame("");
        setSummary("");
        setCampaigncoop("");
        setOfflinecoop("");
        setOnlinecoop("");
        setOnlinemax(0);
        props.refreshGames();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddGame">
      <h3>Add Game</h3>

      <form onSubmit={handleSubmit}>
        <label>Name of the game: </label>
        <input
          type="text"
          name="name"
          value={game.name}
          onChange={handleGame}
        />
        <br />
        <label>Description : </label>
        <textarea
          type="text"
          name="summary"
          value={game.summary}
          onChange={handleSummary}
        />
        <br />
        <label>Campaign playable in coop : </label>
        <select
          type="boolean"
          name="summary"
          value={game.campaigncoop}
          onChange={handleCampaigncoop}
        >
          <option value="">Select an option </option>
          <option value="campaigncoop">Yes</option>
          <option value="campaigncoop">No</option>
        </select>
        <br />
        <label> Local coop mode : </label>
        <select
          type="boolean"
          name="offlinecoop"
          value={game.offlinecoop}
          onChange={handleOfflinecoop}
        >
          <option value="">Select an option </option>
          <option value="offlinecoop">Yes</option>
          <option value="offlinecoop">No</option>
        </select>
        <br />
        <label>Online coop mode : </label>
        <select
          type="boolean"
          name="onlinecoop"
          value={game.onlinecoop}
          onChange={handleOnlinecoop}
        >
          <option value=""> Select an option </option>
          <option value="onlinecoop">Yes</option>
          <option value="onlinecoop">No</option>
        </select>
        <br />
        <label>Numbers maximum of players : </label>
        <input
          type="number"
          name="onlinemax"
          value={game.onlinemax}
          onChange={handleOnlinecoop}
        ></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddGame;
