import './Header.scss';
import { useEffect, useState } from 'react';
import Logo from "../../components/Logo/Logo";
import Search from "../../components/Search/Search";
import Navigation from "../../components/Navigation/Navigation";
import UserMenu from "../../components/UserMenu/UserMenu";

export default function Header() {
    const [searchValue, setSearchValue] = useState("");
    const [scroll, setScroll] = useState(false);

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
                    <a href="/"><Logo/></a>
                    <Navigation />
                    {/* <Search placeholder="What do you want to listen to?" value={searchValue} change={setSearchValue} /> */}
                    <UserMenu />
                </div>
            </header>     
        </>
    )
}