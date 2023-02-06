import "./TopTracks.scss";
import dayjs from 'dayjs';

export default function TopTracks({topTracks}) {
    return (
        topTracks.length ?
        <>
        <h2 className="list-title">Top Tracks</h2>
            <div className="top-tracks">
                {
                    topTracks.slice(0, 5).map((item, index) => {
                        return <div className="top-tracks-row flex" key={item.key}>
                            <div className="track-details flex">
                                <div className="track-img">
                                    <img src={item.album.images[2]?.url} width="40" height="40" alt={item.name} />
                                    <button>
                                        <svg role="img" height="16" width="16" viewBox="0 0 24 24"><path fill="#fff" d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                                    </button>
                                </div>
                                <div className="track-details-bottom flex">
                                    <div className="track-name">{item.name}</div>
                                    <div className="track-artists">{item.artists.map( artist => artist.name ).join(', ')}</div>
                                </div>
                            </div>
                            <div className="track-duration">
                                {dayjs(item.duration_ms).format("HH:mm:ss")}
                            </div>
                        </div>
                    })
                }                    
            </div>
        </>
        :
        null
    )
}