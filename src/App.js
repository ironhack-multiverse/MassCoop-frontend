//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LogOut from './components/LogOut';

function App() {
  return (
    <div className="App">
 
 <NavBar/>

 <Routes>
  <Route path="/" element={<HomePage /> } />
  <Route path="/login" element={<LoginPage /> } />
  <Route path="/signup" element={<SignupPage /> } />
  <Route path="/logout" element= {<LogOut/>} />
  </Routes>

    </div>
  );
}

export default App;
