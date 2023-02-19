import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import CurrentTrack from "../../components/CurrentTrack/CurrentTrack";

export default function Footer() {
    return (
        <footer>
            <div className="container flex">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <CurrentTrack />
            </div>
        </footer>
    )
}