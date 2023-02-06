import "./Navigation.scss";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <nav className="navigation flex">    
            <ul className="flex">
                <li onClick={ () => navigate("/")} className={location.pathname === "/" ? "active" : null}><a>Home</a></li>
                <li onClick={ () => navigate("/playlists")} className={location.pathname === "/playlists" ? "active" : null}><a>Playlists</a></li>
                <li onClick={ () => navigate("/artists")} className={location.pathname === "/artists" ? "active" : null}><a>Artists</a></li>
            </ul>  
        </nav>        
    )
}