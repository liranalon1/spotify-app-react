import "./UserMenu.scss";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
      localStorage.removeItem("token");
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