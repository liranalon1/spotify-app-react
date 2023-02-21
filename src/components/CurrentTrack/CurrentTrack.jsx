import "./CurrentTrack.scss";
import { useEffect, useContext } from "react";
import { context } from "@/App";
import { callAPI } from "@/services/api";

export default function CurrentTrack() {
    const { token, currentTrack, setCurrentTrack, trackIsPlaying, setTrackIsPlaying } = useContext(context);

    useEffect(() => {
        getCurrentTrack();
    }, []);

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
                setTrackIsPlaying(res.data.is_playing);
                const {item} = res.data;
                setCurrentTrack({
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map(artist => artist.name),
                    image: item.album.images[2].url
                });
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