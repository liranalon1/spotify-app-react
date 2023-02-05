import "./Cards.scss";
import CardItem from "../CardItem/CardItem";

export default function Cards({title, items}) {
    return (
        items.length ?
        <>
            <h2 className="list-title">{title}</h2>
            <div className="cards-wrapper">
                {
                    items.map((item, index) => {
                        return <CardItem item={item} index={index} title={title}/>
                    })            
                }  
            </div>        
        </>
        :
        null
    )
}