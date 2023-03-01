import "./CardItem.scss";
import dayjs from 'dayjs';
import { useContext } from "react";
import { context } from "@/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { callAPI } from "@/services";

export default function CardItem({item, cardSection}) {
    const { token, currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useContext(context);
    
    function handleCurrentTrack(item) {
        const apiParams = {
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        switch(item.type){
            case "artist":
                callAPI({
                    url: `v1/artists/${item.id}/top-tracks?include_groups=album&market=US&limit=50`, 
                    params: apiParams
                }).then((res) => {
                    if(res.status === 200){
                        const topTrackItem = res.data.tracks[0];
                        setCurrentTrack({
                            id: topTrackItem.id,
                            name: topTrackItem.name,
                            artists: topTrackItem.artists.map(artist => artist.name),
                            image: topTrackItem.album.images[2].url,
                            uri: res.data.tracks.map(track => track.uri),
                            type: item.type,
                        });
                    }
                }); 
                break;
            case "playlist":
                callAPI({
                    url: `v1/playlists/${item.id}/tracks`, 
                    params: apiParams
                }).then((res) => {
                    if(res.status === 200){
                        const topTrackItem = res.data.items[0].track;
                        const uriLists = res.data.items.map(({track}) => track.uri);
                        setCurrentTrack({
                            id: topTrackItem.id,
                            name: topTrackItem.name,
                            artists: topTrackItem.artists.map(artist => artist.name),
                            image: topTrackItem.album.images[2].url,
                            uri: uriLists,
                            type: item.type,
                        });
                    }
                }); 
                break;                
            case "album":
            case "track":
                setCurrentTrack({
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map(artist => artist.name),
                    image: item.images[2].url,
                    uri: item.uri,
                    type: item.type,
                });
                break;
            default:              
        }

        handleIsPlaying(item.type);
    }

    function handleIsPlaying(itemType){
        switch(itemType) {
            case "artist":
                if( isPlaying && currentTrack.artists?.some( artist => artist === item.name ) ){
                    setIsPlaying(false);
                }else{
                    setIsPlaying(true);
                }
                break;            
            default:
                if( isPlaying && currentTrack.name === item.name ){
                    setIsPlaying(false);
                }else{
                    setIsPlaying(true);
                }
        }
    }

    function itemIsActive(itemType) {
        if(itemType === "artist"){
            return isPlaying && currentTrack.artists?.some( artist => artist === item.name );
        }else{
            return isPlaying && currentTrack.name === item.name;
        }
    }

    function handleCoverSrc() {
        if( item.type === "track" ){
            return item.album.images[0]?.url;
        }else{
            return item.images[0]?.url;
        }
    }

    function handleCardContent() {
        switch(item.type) {
            case "artist":
                return <p>{item.type}</p>
            case "album":
                return <p>{dayjs(item.release_date).year()} • <a href="/artist/06HL4z0CvFAxyc27GXpf02">{item.artists[0].name}</a></p>     
            case "track":
                return <p>{item.artists.map( artist => artist.name ).join(", ")}</p>                          
            default:
        }
    }

    return (
        <>
        <div className={`card ${itemIsActive(item.type) ? "active" : ""} ${cardSection}-card`}>
            <div className="cover">
                <img 
                    className={`type-${item.type}`} 
                    src={handleCoverSrc(item)} 
                    width="100%" 
                    height="100%" 
                    alt={item.name} 
                />
                <button className="play-btn" onClick={() => handleCurrentTrack(item)}>
                    { itemIsActive(item.type) ? 
                        <FontAwesomeIcon icon={faPause} width="24" height="24" /> 
                        : 
                        <FontAwesomeIcon icon={faPlay} width="24" height="24"/> 
                    }
                </button>
            </div>
            <div className="card-content">
                <h4 className="text-elipsis">{item.name}</h4>
                {handleCardContent()}
            </div>
        </div>        
        </>
    )
}