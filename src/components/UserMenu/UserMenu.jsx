import "./UserMenu.scss";
import { context } from "../../App";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
    const { setToken } = useContext(context);
    const navigate = useNavigate();

    function handleLogout() {
      localStorage.removeItem("token");
      setToken("");
      navigate("/login");
    }

    return (
        <div className="user-menu">
            <div className="trigger-menu"></div>
            <ul className="floating-menu flex">
                <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
        </div>
    )
}