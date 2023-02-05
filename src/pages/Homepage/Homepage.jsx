import "./Homepage.scss"
import { context } from "../../App";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";
import Search from "../../components/Search/Search";
import UsersTopArtists from "../../components/UsersTopArtists/UsersTopArtists";
import TopTracks from "../../components/TopTracks/TopTracks";
import Cards from "../../components/Cards/Cards";
import { callAPI } from "../../services/api";

export default function Homepage() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { setLoading } = useContext(context);
    const apiParams = {
        method: "get",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const [searchValue, setSearchValue] = useState("");
    const [topArtists, setTopArtists] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);

    useEffect(() => {
        if( token ){
            
        }else{
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if(searchValue === ""){
            getUsersTopArtists({type:"artists", params: apiParams})
        }else{
            handleSearch();
        }
    }, [searchValue]);

    function handleSearch() {
        setLoading(true);
        getArtistID({value: searchValue, params: apiParams});
    }

    function getUsersTopArtists({type, params}){
        callAPI({
            url: `v1/me/top/${type}`, 
            params: params
        })
        .then((res) => {
            if(res.status === 200){
                setTopArtists(res.data.items);
            }else{
                console.log(res);
                if(res.data.error.message === "The access token expired"){
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            }
        });
    }

    function getArtistID({value, params}) {
        callAPI({
            url: `v1/search?q=${value}&type=artist`, 
            params: params
        })
        .then((res) => {
            if(res.status === 200){
                if(res.data.artists.items.length){
                    setNoResults(false);
                    getArtistTopTracks({params: params, id: res.data.artists.items[0]?.id});
                    getArtistAlbums({params: params, id: res.data.artists.items[0]?.id});
                    getRelatedArtists({params: params, id: res.data.artists.items[0]?.id});
                }else{
                    setNoResults(true);
                    setLoading(false);
                }
            }else{
                console.log(res);
                if(res.data.error.message === "The access token expired"){
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            }
        });        
    }

    function getArtistTopTracks({params, id}) {
        callAPI({
            url: `v1/artists/${id}/top-tracks?include_groups=album&market=US&limit=50`, 
            params: params
        }).then((res) => {
            if(res.status === 200){
               setTopTracks(res.data.tracks);
               setLoading(false);
            }else{
                console.log(res);
                if(res.data.error.message === "The access token expired"){
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            }
        });
    }

    function getArtistAlbums({params, id}) {
        callAPI({
            url: `v1/artists/${id}/albums?include_groups=album&market=US&limit=50`, 
            params: params
        }).then((res) => {
            if(res.status === 200){
               setAlbums(res.data.items);
               setLoading(false);
            }else{
                console.log(res);
                if(res.data.error.message === "The access token expired"){
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            }
        });
    }

    function getRelatedArtists({params, id}) {
        callAPI({
            url: `v1/artists/${id}/related-artists`, 
            params: params
        }).then((res) => {
            if(res.status === 200){
               setRelatedArtists(res.data.artists);
               setLoading(false);
            }else{
                console.log(res);
                if(res.data.error.message === "The access token expired"){
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            }
        });
    }

    function noResultsTemplate() {
        return <div className="no-results">
            <h1>No results found for {searchValue}</h1>
            <p>Please make sure your words are spelled correctly or use less or different keywords.</p>
        </div>
    }

    return (
        <>
            <Navigation/>
            <div className="container">
                <Search placeholder="What do you want to listen to?" value={searchValue} change={setSearchValue} />
                {
                    noResults ? noResultsTemplate() : 
                    searchValue === "" 
                    ?
                        <UsersTopArtists topArtists={topArtists} />
                    :
                        <>
                        <TopTracks topTracks={topTracks} />
                        <Cards title="Albums" items={albums} />
                        <Cards title="Related Artists" items={relatedArtists} />
                        </>
                }
            </div>  
        </>
    )
}