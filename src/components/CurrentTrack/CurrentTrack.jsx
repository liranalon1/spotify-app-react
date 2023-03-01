import "./CurrentTrack.scss";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "@/App";
import { callAPI } from "@/services";

export default function CurrentTrack() {
    const { token, setToken, currentTrack, setCurrentTrack, cardIsActive, setCardIsActive } = useContext(context);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentTrack();
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }

    function getCurrentTrack(){
        callAPI({
            url: "v1/me/player/currently-playing", 
            params: {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }         
        })
        .then((res) => {
            if(res.data !== ""){
                setCardIsActive(res.data.is_playing);
                const {item} = res.data;
                setCurrentTrack({
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map(artist => artist.name),
                    image: item.album.images[2].url
                });
            }else{
                console.log(res);
                if(res.status === 401){
                    handleLogout();
                }
            }
        });
    }

    return (
        currentTrack ?
        <div className="current-track-wrap flex">
           <div className="track-image">
                <img src={currentTrack.image} alt={currentTrack.name} width="100%" height="100%" />
            </div> 
            <div className="track-info">
                <h4>{currentTrack.name}</h4>
                <p>{currentTrack.artists?.join(", ")}</p>
            </div>
        </div>
        :
        null
    )
}