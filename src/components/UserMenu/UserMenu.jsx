import "./UserMenu.scss";
import { context } from "@/App";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { callAPI } from "@/services";

export default function UserMenu() {
    const navigate = useNavigate();
    const { token, setToken } = useContext(context);
    const [userProfile, setUserProfile] = useState(null);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    useEffect(() => {
        getUserProfile();
    },[]);

    function getUserProfile() {
        callAPI({
            url: `v1/me/`, 
            params: {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        .then((res) => {
            if(res.status === 200){
                setUserProfile(res.data);
            }else{
                console.log(res);
                if(res.status === 401){
                    handleLogout();
                }
            }
        });
    }

    function handleLogout() {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
    }

    function handleAvatar() {
        let userAvater = null;
        userProfile.images.length 
        ?
        userAvater = <img src={userProfile.images[0]?.url} width="100%" height="100%" alt={userProfile.display_name}/>
        :
        userAvater = <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill="#fff"><path d="M6.233.371a4.388 4.388 0 015.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 00.201 1.13l2.209 1.275a4.75 4.75 0 012.375 4.114V16H.382v-1.143a4.75 4.75 0 012.375-4.113l2.209-1.275a.75.75 0 00.201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 01.904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 00-2.13.937 2.85 2.85 0 00-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 01-.603 3.39l-2.209 1.275A3.25 3.25 0 001.902 14.5h12.196a3.25 3.25 0 00-1.605-2.457l-2.209-1.275a2.25 2.25 0 01-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 00-.588-1.022A2.888 2.888 0 008 1.5z"></path></svg>
        return userAvater;
    }

    function toggleDropdownMenu() {
        setMenuIsOpen(menuIsOpen ? false : true);
    }

    return (
        userProfile ?
        <div className="user-menu">
            <div className="trigger-menu flex" onClick={toggleDropdownMenu}>
                <div className="user-avater">{ handleAvatar() }</div>
                <div className="display-name text-elipsis">{userProfile.display_name}</div>
                <div className={`arrow ${menuIsOpen ? "up" : "down"}`}></div>
            </div>
            <ul className={`dropdown-menu flex ${menuIsOpen ? "active" : null}`}>
                <li><a>Account</a></li>
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
        </div>
        :
        null
    )
}