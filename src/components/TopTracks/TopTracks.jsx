import "./TopTracks.scss";
import { useContext } from "react";
import { context } from "@/App";
import CardItem from "@/components/CardItem/CardItem";
import dayjs from 'dayjs';

export default function TopTracks({topTracks}) {
    const { currentTrack, isPlaying } = useContext(context);

    function itemIsActive(item) {
        return isPlaying && currentTrack.name === item.name;
    }

    return (
        topTracks.length ?
        <div className="top-tracks">
            <h2 className="list-title">Top Tracks</h2>
            {
                topTracks.slice(0, 5).map((item, index) => {
                    // return <div className="top-tracks-row flex" key={item.key}>
                    return <div className={`top-tracks-row flex ${itemIsActive(item) ? "active" : ""}`} key={item.key}>
                        <CardItem item={item} cardSection="top-tracks" key={item.id}/> 
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