import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddGame(props) {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [campaigncoop, setCampaigncoop] = useState(false);
  const [offlinecoop, setOfflinecoop] = useState(false);
  const [onlinecoop, setOnlinecoop] = useState(false);
  const [onlinemax, setOnlinemax] = useState("");

  const handleName = (e) => setName(e.target.value);
  const handleSummary = (e) => setSummary(e.target.value);
  const handleCampaigncoop = (e) => setCampaigncoop(e.target.checked);
  const handleOfflinecoop = (e) => setOfflinecoop(e.target.checked);
  const handleOnlinecoop = (e) => setOnlinecoop(e.target.checked);
  const handleOnlinemax = (e) => setOnlinemax(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      game: {
        name,
        summary,
      },
      campaigncoop,
      offlinecoop,
      onlinecoop,
      onlinemax: Number(onlinemax),
    };

    console.log(requestBody);
    // return

    //const storedToken = localStorage.getItem("authToken");
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL || API_URL}/api/games`,
        requestBody,
        {}
      )
      .then((response) => {
        setName("");
        setSummary("");
        setCampaigncoop(false);
        setOfflinecoop(false);
        setOnlinecoop(false);
        setOnlinemax(0);
        // props.refreshGames();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddGame">
      <h3>Add Game</h3>

      <form onSubmit={handleSubmit}>
        <label>Name of the game: </label>
        <input type="text" name="name" value={name} onChange={handleName} />
        <br />
        <label>Description : </label>
        <textarea
          type="text"
          name="summary"
          value={summary}
          onChange={handleSummary}
        />
        <br />
        <label>Campaign playable in coop : </label>
        <input
          type="checkbox"
          name="summary"
          defaultChecked={campaigncoop}
          onChange={handleCampaigncoop}
        />

        <br />
        <label> Local coop mode : </label>
        <input
          type="checkbox"
          name="offlinecoop"
          defaultChecked={offlinecoop}
          onChange={handleOfflinecoop}
        />

        <br />
        <label>Online coop mode : </label>
        <input
          type="checkbox"
          name="onlinecoop"
          defaultChecked={onlinecoop}
          onChange={handleOnlinecoop}
        />

        <br />
        <label>Numbers maximum of players : </label>
        <input
          type="number"
          name="onlinemax"
          value={onlinemax}
          onChange={handleOnlinemax}
        ></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddGame;
