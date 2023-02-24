import "./TopTracks.scss";
import dayjs from 'dayjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function TopTracks({topTracks}) {
    return (
        topTracks.length ?
        <div className="top-tracks">
            <h2 className="list-title">Top Tracks</h2>
            {
                topTracks.slice(0, 5).map((item, index) => {
                    return <div className="top-tracks-row flex" key={item.key}>
                        <div className="track-details flex">
                            <div className="track-img">
                                <img src={item.album.images[2]?.url} width="40" height="40" alt={item.name} />
                                <FontAwesomeIcon icon={faPlay} color="#fff" width="16" height="16"/>
                            </div>
                            <div className="track-details-bottom flex">
                                <div className="track-name">{item.name}</div>
                                <div className="track-artists">{item.artists.map( artist => artist.name ).join(", ")}</div>
                            </div>
                        </div>
                        <div className="track-duration">
                            {dayjs(item.duration_ms).format("HH:mm:ss")}
                        </div>
                    </div>
                })
            }                    
        </div>
        :
        null
    )
}