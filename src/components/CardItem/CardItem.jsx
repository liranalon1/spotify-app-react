import "./CardItem.scss";
import dayjs from 'dayjs';
import { useContext } from "react";
import { context } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function CardItem({item, index, title}) {
    const { currentTrack, setCurrentTrack, trackIsPlaying, setTrackIsPlaying } = useContext(context);
    const itemIsActive = currentTrack.id === item.id && trackIsPlaying;

    function handleCurrentTrack({id, name, artists, image}) {
        
        setCurrentTrack({
            id: id,
            name: name,
            artists: artists,
            image: image
        });

        setTrackIsPlaying(!trackIsPlaying);
    }

    return (
        <>
        <div className={`card ${itemIsActive ? "active" : ""}`}>
            <div className="cover">
                <img className={`type-${item.type}`} src={item.images[0]?.url} width="100%" height="100%" alt={item.name} />
                <div className="circle-icon" onClick={() => handleCurrentTrack({id: item.id, name: item.name, artists: item?.artists.map(artist => artist.name), image: item?.images[2].url})}>
                    { itemIsActive ? 
                        <FontAwesomeIcon icon={faPause} color="#121212" width="24" height="24" /> 
                        : 
                        <FontAwesomeIcon icon={faPlay} color="#121212" width="24" height="24"/> 
                    }
                </div>
            </div>
            <div className="card-content">
                <h4 className="text-elipsis">{item.name}</h4>
                {
                    title === "Albums" 
                    ?
                    <p>{dayjs(item.release_date).year()} • <a href="/artist/06HL4z0CvFAxyc27GXpf02">{item.artists[0].name}</a></p>
                    :
                    <p>{item.type}</p>
                }
            </div>
        </div>        
        </>
    )
}