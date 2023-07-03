import { useEffect } from "react";
import axios from "axios";

function LogOut({ history }) {
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("/logout");
      
        history.push("/"); 
      } catch (error) {
        console.log("Logout failed:", error);
      }
    };

    logout();
  }, [history]);

  return <div>Logging out...</div>;
}

export default LogOut;