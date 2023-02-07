import "./TopResult.scss";

export default function TopResult({topTrack}) {
    return (
        topTrack !== undefined ?
        <div className="top-result">
            <h2 className="list-title">Top Result</h2>
            <div className="card flex">
                <div className="cover">
                    <img src={topTrack.album.images[1]?.url} width="100%" height="100%" alt={topTrack.name} />
                    <div className="play-icon">
                    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </div>
                </div>
                <div className="card-content">
                    <h3 className="text-elipsis">{topTrack.name}</h3>
                    <p>{topTrack.artists.map( artist => artist.name ).join(', ')}</p>
                </div>                
            </div>                   
        </div>
        :
        null
    )
}