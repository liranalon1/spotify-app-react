import './Header.scss';
import { useEffect, useState } from 'react';
import Logo from "../../components/Logo/Logo";
import Search from "../../components/Search/Search";
import Navigation from "../../components/Navigation/Navigation";
import UserMenu from "../../components/UserMenu/UserMenu";

export default function Header() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <>
            <header className="flex">
                <div className="container flex">
                    <a href="/"><Logo/></a>
                    <Navigation />
                    <Search placeholder="What do you want to listen to?" value={searchValue} change={setSearchValue} />
                    <UserMenu />
                </div>
            </header>     
        </>
    )
}