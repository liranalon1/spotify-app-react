import "./ThemeButton.scss";
import { themeContext } from "../../App";
import { useContext } from 'react';

export default function ThemeButton() {
    const { theme, setTheme } = useContext(themeContext);

    function toggleTheme(){
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    return (
        <div className="theme-button-wrap">
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    )
}