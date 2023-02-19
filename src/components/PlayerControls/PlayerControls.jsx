import "./PlayerControls.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause, faShuffle, faForwardStep, faBackwardStep, faRotateRight } from "@fortawesome/free-solid-svg-icons";
export default function PlayerControls() {
    return (
        <>
        <FontAwesomeIcon icon={faShuffle} />
        <FontAwesomeIcon icon={faCirclePlay} />
        <FontAwesomeIcon icon={faCirclePause} />
        <FontAwesomeIcon icon={faBackwardStep} />
        <FontAwesomeIcon icon={faForwardStep} />
        <FontAwesomeIcon icon={faRotateRight} />
        </>
    )
}