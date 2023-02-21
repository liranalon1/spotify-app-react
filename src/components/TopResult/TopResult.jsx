import "./TopResult.scss";
import { useContext } from "react";
import { context } from "@/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function TopResult({topTrack}) {
    const { currentTrack, setCurrentTrack, trackIsPlaying, setTrackIsPlaying } = useContext(context);
    const itemIsActive = currentTrack.id === topTrack?.id && trackIsPlaying;

    function handleCurrentTrack({id, name, artists, image}) {
        setCurrentTrack({
            id: id,
            name: name,
            artists: artists,
            image: image
        });

        itemIsActive ? setTrackIsPlaying(false) : setTrackIsPlaying(true);
    }

    return (
        topTrack !== undefined ?
        <div className="top-result">
            <h2 className="list-title">Top Result</h2>
            <div className={`card ${itemIsActive ? "active" : ""} flex`}>
                <div className="cover">
                    <img src={topTrack.album.images[1]?.url} width="100%" height="100%" alt={topTrack.name} />
                    <div className="circle-icon" onClick={() => handleCurrentTrack({id: topTrack.id, name: topTrack.name, artists: topTrack?.artists.map(artist => artist.name), image: topTrack?.album.images[2].url})}>
                        { itemIsActive ? 
                            <FontAwesomeIcon icon={faPause} color="#121212" width="24" height="24" /> 
                            : 
                            <FontAwesomeIcon icon={faPlay} color="#121212" width="24" height="24"/> 
                        }
                    </div>
                </div>
                <div className="card-content">
                    <h3 className="text-elipsis">{topTrack.name}</h3>
                    <p>{topTrack.artists.map( artist => artist.name ).join(", ")}</p>
                </div>                
            </div>                   
        </div>
        :
        null
    )
}