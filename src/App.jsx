import './App.scss';
import { useState, useEffect, createContext } from "react";
import Loader from "./components/Loader/Loader";
import Header from "./layouts/Header/Header";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import Playlists from "./pages/Playlists/Playlists";
import Artists from "./pages/Artists/Artists";
import { Routes, Route } from 'react-router-dom';

export const context = createContext();
export default function App() {
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="App">
      { loading ? <Loader /> : null }
      
      <context.Provider value={
        { 
          setLoading, 
          searchItem, 
          setSearchItem, 
          token, 
          setToken 
        }
      }>
        { token ? <Header/> : null }
        <Routes>
          <Route exact path="/*" element={<Login/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<Homepage/>}/>
          <Route exact path="/playlists" element={<Playlists/>}/>
          <Route exact path="/artists" element={<Artists/>}/>
        </Routes>
      </context.Provider>
    </div>
  )
  
}
