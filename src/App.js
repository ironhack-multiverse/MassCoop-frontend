//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddGame from './components/AddGame';
import Games from './components/DisplayGamesPage';
import GamesDetailsPage from './pages/GameDetailsPage';
import ReviewCard from './components/ReviewCard';
import EditReviewPage from './pages/EditReviewPage';
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">
 
 <NavBar/>

 <Routes>
  <Route path="/" element={<HomePage /> } />
  <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
  <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
  <Route path="/games" element={<Games /> } />
  <Route path="/games/create" element={<IsPrivate><AddGame /></IsPrivate> } />
  <Route path="/reviews/edit/:reviewId" element={<IsPrivate> <EditReviewPage /> </IsPrivate>  } />
  <Route path="/games/:gameId" element={<GamesDetailsPage /> } />
  </Routes>

    </div>
  );
}

export default App;
