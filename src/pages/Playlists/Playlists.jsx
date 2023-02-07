import './Playlists.scss';
import { context } from "../../App";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { callAPI } from "../../services/api";
import Cards from "../../components/Cards/Cards";
// const PlaylistAPI = `${baseAPI}/v1/playlists/${playlist_id}`;

export default  function Playlists() {
    const { token, setLoading, searchItem } = useContext(context);
    const navigate = useNavigate();
    const [playListsData, setPlayListsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if( !token ){
            navigate("/login");
        }else{
            getAllPlaylistsData();
        }
    }, [token]);

    useEffect(() => {
        setFilteredData(playListsData.filter((item, index) => {
            return item.name.toLowerCase().includes(searchItem.toLowerCase());
            // return item.id === getPlaylistsData(item.id);
        }));
    }, [searchItem]);

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
     
    }

    return (
        <div id="playlists-page">
            <div className="container">
                <Cards title="Playlists" items={playListsData} />
            </div>
        </div>
    )
}