import { useState } from "react";
import axios from "axios";
//import gamesService from "../services/games.services";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddGame(props) {
  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [campaigncoop, setCampaigncoop] = useState(false);
  const [offlinecoop, setOfflinecoop] = useState(false);
  const [onlinecoop, setOnlinecoop] = useState(false);
  const [onlinemax, setOnlinemax] = useState("");
  const [offlinemax, setOfflinemax] = useState("");

  const handleName = (e) => setName(e.target.value);
  const handleSummary = (e) => setSummary(e.target.value);
  const handleCampaigncoop = (e) => setCampaigncoop(e.target.checked);
  const handleOfflinecoop = (e) => setOfflinecoop(e.target.checked);
  const handleOnlinecoop = (e) => setOnlinecoop(e.target.checked);
  const handleOnlinemax = (e) => setOnlinemax(e.target.value);
  const handleOfflinemax = (e) => setOfflinemax(e.target.value);

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
      offlinemax: Number(offlinemax),
    };

    console.log(requestBody);
    // return

    //const storedToken = localStorage.getItem("authToken");
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL || API_URL}/api/games`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setName("");
        setSummary("");
        setCampaigncoop(false);
        setOfflinecoop(false);
        setOnlinecoop(false);
        setOnlinemax(0);
        setOfflinemax(0);
        const gameId = response.data._id;
        navigate(`/games/${gameId}`);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div class="detail-card pt-0 pb-0">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
    <div class="card shadow-2-strong" style={{ borderRadius: "1rem;" }}>
        <div className="AddGame pt-5 pb-5">
          <h3>Add Game</h3>

          <form onSubmit={handleSubmit}>
            <label>Name of the game: </label> {"  "}
            <input type="text" name="name" value={name} onChange={handleName} />
            <br />
            <label>Description : </label> {"  "}
            <textarea
              type="text"
              name="summary"
              value={summary}
              onChange={handleSummary}
            />
            <br />
            <label>Campaign playable in coop : </label> {"  "}
            <input
              type="checkbox"
              name="summary"
              defaultChecked={campaigncoop}
              onChange={handleCampaigncoop}
            />

            <br />
            <label> Local coop mode : </label> {"  "}
            <input
              type="checkbox"
              name="offlinecoop"
              defaultChecked={offlinecoop}
              onChange={handleOfflinecoop}
            />

            <br />
            <label>Online coop mode : </label> {"  "}
            <input
              type="checkbox"
              name="onlinecoop"
              defaultChecked={onlinecoop}
              onChange={handleOnlinecoop}
            />

            <br />
            <label>Numbers maximum of online players : </label> {"  "}
            <input
              type="number"
              min="1"
              max="99"
              name="onlinemax"
              value={onlinemax}
              onChange={handleOnlinemax}
            ></input>
            <br />
            <label>Numbers maximum of offline players : </label> {"  "}
            <input
              type="number"
              min="1"
              max="99"
              name="offlinemax"
              value={offlinemax}
              onChange={handleOfflinemax}
            ></input>
            <br />
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AddGame;
