import "./CardItem.scss";
import dayjs from 'dayjs';

export default function CardItem({item, index, title}) {
    return (
        <>
        <div className="card" key={item.id}>
            <div className="cover">
                <img src={item.images[0]?.url} width="100%" height="100%" alt={item.name} />
                <div className="play-icon">
                    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
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