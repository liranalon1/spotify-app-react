import "./PlayerControls.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause, faShuffle, faForwardStep, faBackwardStep, faRotateRight } from "@fortawesome/free-solid-svg-icons";
export default function PlayerControls() {
    return (
        <div className="Player-controls flex">
            <div className="shuffle">
                <FontAwesomeIcon icon={faShuffle} />
            </div>
            <div className="previous">
                <FontAwesomeIcon icon={faBackwardStep} />
            </div>
            <div className="state">
                <FontAwesomeIcon icon={faCirclePlay} />
                <FontAwesomeIcon icon={faCirclePause} />
            </div>
            <div className="next">
                <FontAwesomeIcon icon={faForwardStep} />
            </div>
            <div className="repeat">
                <FontAwesomeIcon icon={faRotateRight} />
            </div>
        </div>
    )
}