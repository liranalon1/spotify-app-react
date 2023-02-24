import "./Cards.scss";
import CardItem from "@/components/CardItem/CardItem";

export default function Cards({title, items}) {
    return (
        items.length ?
        <div className="cards-wrapper">
            <h2 className="list-title">{title}</h2>
            <div className="cards">
                {
                    items.map((item) => {
                        return <CardItem item={item} key={item.id}/>
                    })            
                }
            </div>
        </div>
        :
        null
    )
}