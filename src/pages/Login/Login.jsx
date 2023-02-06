import './Login.scss';
import { useEffect, useState, useContext } from 'react';
import { context } from "../../App";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

const authAPI = "https://accounts.spotify.com/authorize";
const clientId = "9c30da69732d433cbeb1ef4871e3ba2a";
const redirectUri = "http://127.0.0.1:80/spotify-app";
const scopes = ["playlist-read-private", "user-follow-read", "user-top-read"];
const scopesParams = scopes.join("%20");

export default function Login() {
    const { token, setToken } = useContext(context);
    const navigate = useNavigate();

    useEffect(() => {
        const hash = location.hash;
        let token = localStorage.getItem("token");

        if(hash && !token){
            token = hash.substring(1).split("&").find(elem => elem.includes("access_token")).split("=")[1];
            window.location.hash = "";
            localStorage.setItem("token", token);
            setToken(token);
            navigate("/");
        }
    }, []);

    function handleLogin() {
        window.location = `${authAPI}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopesParams}&response_type=token&show_dialog=true`;
    }
    
    return (
        <div id="login-page">
            <a href="/login"><Logo/></a>
            <button className="btn" onClick={handleLogin}>Login</button>    
        </div>   
    )
}