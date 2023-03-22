import './Artists.scss';
import { useEffect, useState, useContext } from 'react';
import { context } from "@/App";
import { useNavigate } from 'react-router-dom';
import { callAPI } from "@/services";
import Cards from "@/components/Cards/Cards";

export default  function Artists() {
    const { token, setToken, setLoading, query } = useContext(context);
    const navigate = useNavigate();
    const [topArtists, setTopArtists] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if( !token ){
            handleLogout();
        }else{
            getUsersTopArtists();
        }
    }, [token]);

    // useEffect(() => {
    //     setFilteredData(artistsData.filter((item, index) => {
    //         return item.name.toLowerCase().includes(query.toLowerCase());
    //         // return item.id === getPlaylistsData(item.id);
    //     }));
    // }, [query]);

    function handleLogout() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }

    function getUsersTopArtists(){
        setLoading(true);
        callAPI({
            url: `v1/me/top/artists`, 
            params: {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        .then((res) => {
            if(res.status === 200){
                setTopArtists(res.data.items);
                setLoading(false);
            }else{
                console.log(res);
                if(res.status === 401){
                    handleLogout();
                }
            }
        });
    }

    return (
        <div id="artists-page">
            <div className="container">
                <Cards title="Your Favorite Artists" items={topArtists} />
            </div>
        </div>
    )
}