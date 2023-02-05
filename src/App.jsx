import './App.css';
import { useState, createContext } from "react";
import Loader from "./components/Loader/Loader";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import Playlists from "./pages/Playlists/Playlists";
import Artists from "./pages/Artists/Artists";
import { Routes, Route } from 'react-router-dom';

export const context = createContext();
export default function App() {
  
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      { loading ? <Loader /> : null }
      
      <context.Provider value={{ setLoading }}>
        <Routes>
          <Route exact path="*" element={<Login/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<Homepage/>}/>
          <Route exact path="/playlists" element={<Playlists/>}/>
          <Route exact path="/artists" element={<Artists/>}/>
        </Routes>
      </context.Provider>
    </div>
  )
  
}
