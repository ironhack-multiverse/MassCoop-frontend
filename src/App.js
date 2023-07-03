//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddGame from './components/AddGame';
import Games from './components/DisplayGamesPage';

function App() {
  return (
    <div className="App">
 
 <NavBar/>

 <Routes>
  <Route path="/" element={<HomePage /> } />
  <Route path="/login" element={<LoginPage /> } />
  <Route path="/signup" element={<SignupPage /> } />
  <Route path="/games" element={<Games /> } />
  <Route path="/games/create" element={<AddGame /> } />
  </Routes>

    </div>
  );
}

export default App;
