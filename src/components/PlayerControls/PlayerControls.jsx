import "./PlayerControls.scss";
import { useContext } from "react";
import { context } from "@/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause, faShuffle, faForwardStep, faBackwardStep, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { callAPI } from "@/services";

export default function PlayerControls() {
    const { token, trackIsPlaying, setTrackIsPlaying, setCurrentTrack } = useContext(context);

    function handleTrack(type) {
        callAPI({
            url: `v1/me/player/${type}`, 
            params: {
                method: "post",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        .then(() => {
            getCurrentTrack();
            setTrackIsPlaying(true);
        });
    }

    function getCurrentTrack() {
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

    function handlePlayingStatus() {
        const currentState = trackIsPlaying ? "pause" : "play";
        callAPI({
            url: `v1/me/player/${currentState}`, 
            params: {
                method: "put",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }         
        })
        .then((res) => {
            setTrackIsPlaying(!trackIsPlaying);
        });
    }

    return (
        <div className="Player-controls flex">
            <div className="shuffle">
                <a><FontAwesomeIcon icon={faShuffle} /></a>
            </div>
            <div className="previous">
                <a onClick={() => handleTrack("previous")}><FontAwesomeIcon icon={faBackwardStep} /></a>
            </div>
            <div className="state">
                { trackIsPlaying ? 
                <a onClick={handlePlayingStatus}><FontAwesomeIcon icon={faCirclePause} /></a>
                : 
                <a onClick={handlePlayingStatus}><FontAwesomeIcon icon={faCirclePlay} /></a>
                }
            </div>
            <div className="next">
                <a onClick={() => handleTrack("next")}><FontAwesomeIcon icon={faForwardStep} /></a>
            </div>
            <div className="repeat">
                <a><FontAwesomeIcon icon={faRotateRight} /></a>
            </div>
        </div>
    )
}