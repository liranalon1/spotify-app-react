import './Header.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Search from "../../components/Search/Search";

export default function Header() {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
      localStorage.removeItem("token");
      navigate("/login");
    }

    return (
        <>
            <header className="flex">
                <div className="container flex">
                    <a href="/"><Logo/></a>
                    <div className="navigation flex">    
                        <ul className="flex">
                            <li onClick={ () => navigate("/")} className={location.pathname === "/" ? "active" : null}>Home</li>
                            <li onClick={ () => navigate("/playlists")} className={location.pathname === "/playlists" ? "active" : null}>Playlists</li>
                            <li onClick={ () => navigate("/artists")} className={location.pathname === "/artists" ? "active" : null}>Artists</li>
                        </ul>  
                    </div>
                    <Search placeholder="What do you want to listen to?" value={searchValue} change={setSearchValue} />    
                    <div className="user-widget">
                        <ul className="flex">
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                </div>
            </header>     
        </>
    )
}