//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
 
 <NavBar/>

 <Routes>
  <Route path="/" element={<HomePage /> } />
  </Routes>

    </div>
  );
}

export default App;
