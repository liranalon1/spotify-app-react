import './Artists.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../layouts/Header/Header";
import Search from "../../components/Search/Search";
import { callAPI } from "../../services/api";

export default  function Artists() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <>
            <Header/>
            <div className="container">
                <Search placeholder="Search for playlists songs" value={searchValue} change={setSearchValue} />
                <h2 className="list-title">Artists</h2>
            </div>
        </>
    )
}