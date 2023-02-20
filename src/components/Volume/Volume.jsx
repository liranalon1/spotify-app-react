import "./Volume.scss";

export default function Volume() {
    function setVolume(e) {
        console.log(e);
    }

    return (
        <div className="Volume">
            <input type="range" min={0} max={100} onMouseUp={(e => setVolume(e))}/>
        </div>
    )
}