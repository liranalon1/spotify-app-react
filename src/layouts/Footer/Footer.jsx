import "./Footer.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <FontAwesomeIcon icon={faEnvelope} /> 
            </div>
        </footer>
    )
}