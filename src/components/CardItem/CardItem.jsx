import "./CardItem.scss";
import dayjs from 'dayjs';
import { useContext } from "react";
import { context } from "@/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { callAPI } from "@/services";

export default function CardItem({item, index, title}) {
    const { token, currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useContext(context);
    
    function handleCurrentTrack(item) {        
        if(item.type !== "album"){
            callAPI({
                url: `v1/artists/${item.id}/top-tracks?include_groups=album&market=US&limit=50`, 
                params: {
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }).then((res) => {
                if(res.status === 200){
                    const topTrackItem = res.data.tracks[0];
                    setCurrentTrack({
                        id: topTrackItem.id,
                        name: topTrackItem.name,
                        artists: topTrackItem.artists.map(artist => artist.name),
                        image: topTrackItem.album.images[2].url
                    });
                }
            });
        }else{
            setCurrentTrack({
                id: item.id,
                name: item.name,
                artists: item.artists.map(artist => artist.name),
                image: item.images[2].url
            });
        }

        handleIsPlaying(item.type)
    }

    function handleIsPlaying(itemType){
        switch(itemType) {
            case "album":
                if( !isPlaying ){
                    setIsPlaying(true);
                    break;
                }else if( isPlaying && currentTrack.name === item.name ){
                    setIsPlaying(false);
                    break;
                }else if( isPlaying && currentTrack.name !== item.name ){
                    setIsPlaying(true);
                    break;
                }else{
                    setIsPlaying(!isPlaying); 
                    break;
                }
            case "artist":
                if( !isPlaying ){
                    setIsPlaying(true);
                    break;
                }else if( isPlaying && currentTrack.artists?.some( artist => artist === item.name ) ){
                    setIsPlaying(false);
                    break;
                }else if( isPlaying && currentTrack.artists?.some( artist => artist !== item.name ) ){
                    setIsPlaying(true);
                    break;
                }else{
                    setIsPlaying(!isPlaying); 
                    break;
                }
            default:
        }
    }

    function itemIsActive(itemType) {
        switch(itemType) {
            case "album":
                return isPlaying && currentTrack.name === item.name;
            case "artist":
                return isPlaying && currentTrack.artists?.some( artist => artist === item.name );
            default:
        }
    }

    return (
        <>
        <div className={`card ${itemIsActive(item.type) ? "active" : ""}`}>
            <div className="cover">
                <img className={`type-${item.type}`} src={item.images[0]?.url} width="100%" height="100%" alt={item.name} />
                <div className="circle-icon" onClick={() => handleCurrentTrack(item)}>
                    { itemIsActive(item.type) ? 
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