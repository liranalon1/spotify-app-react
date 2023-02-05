import './Playlists.scss';
import { context } from "../../App";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";
import Search from "../../components/Search/Search";
import { callAPI } from "../../services/api";
// const PlaylistAPI = `${baseAPI}/v1/playlists/${playlist_id}`;

export default  function Playlists() {
    const { setLoading } = useContext(context);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [searchValue, setSearchValue] = useState("");
    const [playListsData, setPlayListsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if( token ){
            getAllPlaylistsData();
        }else{
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        setFilteredData(playListsData.filter((item, index) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
            // return item.id === getPlaylistsData(item.id);
        }));
    }, [searchValue]);

    function getAllPlaylistsData() {
        setLoading(true);
        callAPI({
            url: "v1/me/playlists", 
            params: {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        .then((res) => {
            if(res.status === 200){
                setPlayListsData(res.data.items);
                setFilteredData(res.data.items);
                setLoading(false);
            }else{
                console.log(res);
                if(res.data.error.message === "The access token expired"){
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            }
        })
        // axios.get(playListsAPI, {
        //     headers:{
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then((res) => {
        //     setPlayListsData(res.data.items);
        //     setFilteredData(res.data.items);
        // }).catch((err) => {
        //     console.error(err.response);
        //     if(err.response.data.error.message === "The access token expired"){
        //         localStorage.removeItem("token");
        //         navigate("/login");
        //     }
        // });
    }

    return (
        <>
            <Navigation/>
            <div className="container">
                <Search placeholder="Search for playlists songs" value={searchValue} change={setSearchValue} />
                <h2 className="list-title">Playlists</h2>
                <div className="cards-wrapper">
                    {
                        filteredData.length ? 
                        filteredData
                        .sort((a, b) => (a.tracks.total < b.tracks.total ? 1 : -1))
                        .map((item, index) => {
                            return <div className="card" key={item.id}>
                                <div className="cover">
                                    <img src={item.images[0]?.url} alt={item.name} />
                                    <div className="play-icon">
                                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h4 className="text-elipsis">{item.name}</h4>
                                    <p>{item.tracks.total} Songs</p>
                                </div>
                            </div>
                        }) : null
                    }
                </div>
            </div>
        </>
    )
}