import './Playlists.scss';
import { useEffect, useState, useContext } from 'react';
import { context } from "@/App";
import { useNavigate } from 'react-router-dom';
import { callAPI } from "@/services";
import Cards from "@/components/Cards/Cards";
// const PlaylistAPI = `${baseAPI}/v1/playlists/${playlist_id}`;

export default  function Playlists() {
    const { token, setToken, setLoading, query } = useContext(context);
    const navigate = useNavigate();
    const [playListsData, setPlayListsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if( !token ){
            handleLogout();
        }else{
            getAllPlaylistsData();
        }
    }, [token]);

    useEffect(() => {
        setFilteredData(playListsData.filter((item, index) => {
            return item.name.toLowerCase().includes(query.toLowerCase());
            // return item.id === getPlaylistsData(item.id);
        }));
    }, [query]);

    function handleLogout() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }

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
                if(res.status === 401){
                    handleLogout();
                }
            }
        })
     
    }

    return (
        <div id="playlists-page">
            <div className="container">
                <Cards title="Your Playlists" items={playListsData} />
            </div>
        </div>
    )
}