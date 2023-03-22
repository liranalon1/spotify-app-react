import "./Homepage.scss";
import { context } from "@/App";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoResults from "@/components/NoResults/NoResults";
import TopResult from "@/components/TopResult/TopResult";
import TopTracks from "@/components/TopTracks/TopTracks";
import Cards from "@/components/Cards/Cards";
import { callAPI } from "@/services";

export default function Homepage() {
    const navigate = useNavigate();
    const { token, setToken, setLoading, searchQuery } = useContext(context);
    const apiParams = {
        method: "get",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const [topArtists, setTopArtists] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);

    useEffect(() => {
        if( !token ){
            handleLogout();
        }else{
            if(searchQuery === ""){
                getUsersTopArtists(apiParams)
            }else{
                handleSearch();
            }
        }
    }, [token, searchQuery]);

    function handleLogout() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }

    function handleSearch() {
        setLoading(true);
        getArtistID({value: searchQuery, params: apiParams});
    }

    function getUsersTopArtists(apiParams){
        callAPI({
            url: `v1/me/top/artists?limit=8`, 
            params: apiParams
        })
        .then((res) => {
            if(res.status === 200){
                setTopArtists(res.data.items);
            }else{
                console.log(res);
                if(res.status === 401){
                    handleLogout();
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
                }
            }else{
                console.log(res);
                if(res.status === 401){
                    handleLogout();
                }
            }

            setLoading(false);
        });        
    }

    function getArtistTopTracks({params, id}) {
        callAPI({
            url: `v1/artists/${id}/top-tracks?include_groups=album&market=US&limit=50`, 
            params: params
        }).then((res) => {
            if(res.status === 200){
               setTopTracks(res.data.tracks);
            }else{
                console.log(res);
                if(res.status === 401){
                    handleLogout();
                }
            }

            setLoading(false);
        });
    }

    function getArtistAlbums({params, id}) {
        callAPI({
            url: `v1/artists/${id}/albums?include_groups=album&market=US&limit=50`, 
            params: params
        }).then((res) => {
            if(res.status === 200){
                const albums = res.data.items
                const uniqueAlbums = [...new Map(albums.map(album => [album.name, album])).values()]; // removing duplicates Albums
               setAlbums(uniqueAlbums);
            }else{
                console.log(res);
                if(res.status === 401){
                    handleLogout();
                }
            }

            setLoading(false);
        });
    }

    function getRelatedArtists({params, id}) {
        callAPI({
            url: `v1/artists/${id}/related-artists`, 
            params: params
        }).then((res) => {
            if(res.status === 200){
               setRelatedArtists(res.data.artists);
            }else{
                console.log(res);
                if(res.status === 401){
                    handleLogout();
                }
            }

            setLoading(false);
        });
    }

    function handleContent(){
        if( searchQuery !== "" && noResults ){
            return <NoResults value={searchQuery}/> 
        } else if( searchQuery === "" ){
            return <Cards title="Your Favorite Artists" items={topArtists} />
        } else{
            return <>
            <div className="top-results-wrapper">
                <TopResult item={topTracks[0]} />
                <TopTracks topTracks={topTracks} />
            </div>
            <Cards title="Albums" items={albums} />
            <Cards title="Related Artists" items={relatedArtists} />
            </>             
        }  
    }

    return (
        <div id="homepage-page">
            <div className="container">
                { handleContent() }
            </div>  
        </div>
    )
}