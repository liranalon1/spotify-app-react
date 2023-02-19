import "./Footer.scss";
import CurrentTrack from "../../components/CurrentTrack/CurrentTrack";
import PlayerControls from "../../components/PlayerControls/PlayerControls";

export default function Footer() {
    return (
        <footer>
            <div className="container flex">
                <CurrentTrack />
                <PlayerControls />
            </div>
        </footer>
    )
}