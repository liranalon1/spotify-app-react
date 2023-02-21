import "./Volume.scss";
import { useContext } from "react";
import { context } from "@/App";
import { callAPI } from "@/services/api";

export default function Volume() {
    const { token } = useContext(context);

    function setVolume(volume) {
        callAPI({
            url: `v1/me/player/volume?volume_percent=${parseInt(volume)}`, 
            params: {
                method: "put",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        .then(() => {
            
        });        
    }

    return (
        <div className="Volume">
            <input type="range" min={0} max={100} onMouseUp={e => setVolume(e.target.value)}/>
        </div>
    )
}