import "./PlayerControls.scss";
import { useState, useEffect, useContext } from "react";
import { context } from "@/App";
import { callAPI } from "@/services";

import SpotifyPlayer from 'react-spotify-web-playback';

export default function PlayerControls() {
    const { token, isPlaying, setIsPlaying, currentTrack, setCurrentTrack } = useContext(context);
    const [playerIsReady, setPlayerIsReady] = useState(false);
    const [playerIsPlaying, setPlayerIsPlaying] = useState(false);
    const [playerCurrentUri, setPlayerCurrentUri] = useState("");

    useEffect(() => {
        if(currentTrack.uri){
            if(isPlaying){
                if(playerCurrentUri !== "" && playerCurrentUri !== currentTrack.uri){
                    setPlayerIsReady(false);
                    setTimeout(() => {
                        setPlayerIsReady(true);
                        setPlayerIsPlaying(true);
                    }, 10);
                }else{
                    setPlayerIsPlaying(true);
                }
            }else{
                setPlayerIsPlaying(false);
            }
            setTimeout(() => {
                setPlayerIsReady(true)
            }, 10) 
        }else{
            GetRecentlyPlayedTrack();
        } 
    },[currentTrack])

    function GetRecentlyPlayedTrack() {
        callAPI({
            url: `v1/me/player/recently-played?limit=1`, 
            params: {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        .then(({data}) => {
            const lastTrack = data.items[0].track;
            setCurrentTrack({
                id: lastTrack.id,
                name: lastTrack.name,
                artists: lastTrack.artists.map(artist => artist.name),
                image: lastTrack.album.images[2].url,
                uri: lastTrack.uri,
            });
            
            // setPlayerIsPlaying(true)
        }); 
    }

    return (
        playerIsReady ? 
        <SpotifyPlayer
            name={"Spotify Web Player app"}
            token={token}
            uris={currentTrack.uri ? [currentTrack.uri]: []}
            play={playerIsPlaying}
            hideAttribution={true}
            initialVolume={0.5}
            callback={state => {
                if(state.track.uri !== "") {
                    setPlayerCurrentUri(state.track.uri) 
                    if(!state.isPlaying) {
                        setPlayerIsPlaying(false);
                        setIsPlaying(false);
                    }else{
                        setPlayerIsPlaying(true);
                        setIsPlaying(true);
                    }
                }else{}
            }}
            showSaveIcon
            styles={{
                activeColor: '#fff',
                bgColor: 'tranparent',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1cb954',
                trackArtistColor: '#b3b3b3',
                trackNameColor: '#fff',
                sliderHandleColor: "#fff",
              }}
        />
        
        :
        null
    )
}