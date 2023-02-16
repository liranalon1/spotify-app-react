import './Header.scss';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { context } from "../../App";
import Logo from "../../components/Logo/Logo";
import Search from "../../components/Search/Search";
import Navigation from "../../components/Navigation/Navigation";
import UserMenu from "../../components/UserMenu/UserMenu";
import ThemeButton from "../../components/ThemeButton/ThemeButton";

export default function Header() {
    const { query, setQuery } = useContext(context);
    const [scroll, setScroll] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", () =>
            setScroll(window.pageYOffset > 50)
        );
      }
    }, []);
    
    return (
        <>
            <header className={`header ${scroll ? "active" : ""} flex`}>
                <div className="container flex">
                    <a onClick={ () => navigate("/")}><Logo /></a>
                    <Navigation />
                    <Search placeholder="What do you want to listen to?" value={query} change={setQuery} />
                    {/* <ThemeButton /> */}
                    <UserMenu />
                </div>
            </header>     
        </>
    )
}