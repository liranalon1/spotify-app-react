import "./TopResult.scss";
import CardItem from "@/components/CardItem/CardItem";

export default function TopResult({item}) {
    return (
        item !== undefined ?
        <div className="top-result">
            <h2 className="list-title">Top Result</h2>
            <CardItem item={item} key={item.id}/>                  
        </div>
        :
        null
    )
}