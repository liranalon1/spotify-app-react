import './App.scss';
import { useState, useEffect, createContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import Loader from "@/components/Loader/Loader";
import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import Login from "@/pages/Login/Login";
import Homepage from "@/pages/Homepage/Homepage";
import Playlists from "@/pages/Playlists/Playlists";
import Artists from "@/pages/Artists/Artists";

export const context = createContext();
export const themeContext = createContext();
export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentTrack, setCurrentTrack] = useState({});
  const [trackIsPlaying, setTrackIsPlaying] = useState(false);
  
  const searchQuery = useDebounce(query, 500)

  // useEffect(() => {
  //   setQuery("");
  //   document.querySelector(".search-input").value = "";
  // }, [location]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App flex ${theme}`}>
      { loading ? <Loader /> : null }
      
      <context.Provider value={
        { 
          setLoading, 
          searchQuery, 
          setQuery, 
          token, 
          setToken,
          currentTrack,
          setCurrentTrack,
          trackIsPlaying,
          setTrackIsPlaying
        }
      }>
        <themeContext.Provider value={{theme, setTheme}}>
          { token ? <Header/> : null }
          <Routes>
            <Route exact path="/*" element={<Login/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/" element={<Homepage/>}/>
            <Route exact path="/playlists" element={<Playlists/>}/>
            <Route exact path="/artists" element={<Artists/>}/>
          </Routes>
          { token ? <Footer/> : null }
        </themeContext.Provider>
      </context.Provider>
    </div>
  )
  
}
