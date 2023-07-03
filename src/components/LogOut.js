// LogoutPage.js
import { useEffect } from "react";
import axios from "axios";

function LogOut({ history }) {
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("/auth/logout");
      
        history.push("/"); // Replace "/" with the desired page after logout
      } catch (error) {
        console.log("Logout failed:", error);
        // Handle logout failure or display an error message
      }
    };

    logout();
  }, [history]);

  return <div>Logging out...</div>;
}

export default LogOut;