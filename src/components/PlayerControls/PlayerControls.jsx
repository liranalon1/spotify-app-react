import "./PlayerControls.scss";
import { useState, useEffect, useContext } from "react";
import { context } from "@/App";
import { callAPI } from "@/services";
import SpotifyPlayer from 'react-spotify-web-playback';

export default function PlayerControls() {
    const { token, cardIsActive, setCardIsActive, currentTrack, setCurrentTrack } = useContext(context);
    const [playerIsReady, setPlayerIsReady] = useState(false);
    const [playerIsPlaying, setPlayerIsPlaying] = useState(false);
    const [playerCurrentID, setPlayerCurrentID] = useState("");

    useEffect(() => {
        if(currentTrack.uri){
            if(cardIsActive){
                if(playerCurrentID !== "" && playerCurrentID !== currentTrack.id){
                    setPlayerIsReady(false);
                    setTimeout(() => {
                        setPlayerIsReady(true);
                        setPlayerIsPlaying(true);
                    }, 10);
                }else setPlayerIsPlaying(true);
            }else setPlayerIsPlaying(false);
            setTimeout(() => {
                setPlayerIsReady(true)
            }, 10) 
        }else GetRecentlyPlayedTracks();
    },[currentTrack])

    function GetRecentlyPlayedTracks() {
        callAPI({
            url: `v1/me/player/recently-played`, 
            params: {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        .then(({data}) => {
            const recentlyPlayedTrack = data.items[0].track;
            const uriLists = data.items.map(({track}) => track.uri);
            setCurrentTrack({
                id: recentlyPlayedTrack.id,
                name: recentlyPlayedTrack.name,
                artists: recentlyPlayedTrack.artists.map(artist => artist.name),
                image: recentlyPlayedTrack.album.images[2].url,
                uri: uriLists,
                type: recentlyPlayedTrack.type,
            });
        }); 
    }

    return (
        playerIsReady ? 
        <SpotifyPlayer
            name={"Spotify Web Player app"}
            token={token}
            uris={currentTrack.uri ? currentTrack.uri: []}
            play={playerIsPlaying}
            hideAttribution={true}
            initialVolume={0.5}
            callback={state => {
                if(state.track.id !== "") {
                    setPlayerCurrentID(state.track.id);
                    if(!state.isPlaying) {
                        setPlayerIsPlaying(false);
                        setCardIsActive(false);
                    }else{
                        setPlayerIsPlaying(true);
                        setCardIsActive(true);
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