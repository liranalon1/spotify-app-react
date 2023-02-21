import "./Footer.scss";
import CurrentTrack from "@/components/CurrentTrack/CurrentTrack";
import PlayerControls from "@/components/PlayerControls/PlayerControls";
import Volume from "@/components/Volume/Volume";

export default function Footer() {
    return (
        <footer>
            <div className="container flex">
                <CurrentTrack />
                <PlayerControls />
                <Volume />
            </div>
        </footer>
    )
}