import "./UsersTopArtists.scss"
import CardItem from "../CardItem/CardItem";

export default function UsersTopArtists({topArtists}) {
    return (
        topArtists.length ?
        <>
            <h2 className="list-title">My Top Artists</h2>
            <div className="cards-wrapper">
                {             
                    topArtists.map((item, index) => {
                        return <CardItem item={item} index={index}/>
                    })
                }
            </div>
        </>
        :
        null
    )
}