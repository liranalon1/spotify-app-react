import "./Homepage.css"
import { context } from "../../App";
import dayjs from 'dayjs';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";
import Search from "../../components/Search/Search";
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
    const [usersTopItems, setUsersTopItems] = useState([]);
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
            getUsersTopItems({type:"artists", params: apiParams})
        }else{
            handleSearch();
        }
    }, [searchValue]);

    function handleSearch() {
        setLoading(true);
        getArtistID({value: searchValue, params: apiParams});
    }

    function getUsersTopItems({type, params}){
        callAPI({
            url: `v1/me/top/${type}`, 
            params: params
        })
        .then((res) => {
            if(res.status === 200){
                setUsersTopItems(res.data.items);
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
                getArtistTopTracks({params: params, id: res.data.artists.items[0].id});
                getArtistAlbums({params: params, id: res.data.artists.items[0].id});
                getRelatedArtists({params: params, id: res.data.artists.items[0].id});
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

    return (
        <>
            <Navigation/>
            <div className="container">
                <Search placeholder="What do you want to listen to?" value={searchValue} change={setSearchValue} />


                { searchValue === "" ?
                    <>
                    <h2 className="list-title">My Top Artists</h2>
                    <div className="cards-wrapper">
                    {
                        usersTopItems.length ? 
                        usersTopItems
                        .map((item, index) => {
                            return <div className="card" key={item.id}>
                                <div className="cover">
                                    <img src={item.images[0]?.url} width="150" height="150" alt={item.name} />
                                    <div className="play-icon">
                                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h4 className="text-elipsis">{item.name}</h4>
                                    <p>{item.type}</p>
                                </div>
                            </div>
                        }) : null
                    }
                    </div>
                    </>
                    :



                    <>
                    <h2 className="list-title">Top Tracks</h2>
                    <div className="top-tracks">
                        {
                            topTracks.length ? 
                            topTracks.slice(0, 5)
                            .map((item, index) => {
                                return <div className="top-tracks-row flex" key={item.key}>
                                    <div className="track-details flex">
                                        <div className="track-img">
                                            <img src={item.album.images[2]?.url} width="40" height="40" alt={item.name} />
                                        </div>
                                        <div className="track-details-bottom flex">
                                            <div className="track-name">{item.name}</div>
                                            <div className="track-artists">{item.artists.map( artist => artist.name ).join(', ')}</div>
                                        </div>
                                    </div>
                                    <div className="track-duration">{dayjs(item.duration_ms).format("HH:mm:ss")}</div>
                                </div>
                            }) : null
                        }
                    </div>
    
    
    
                    <h2 className="list-title">Albums</h2>
                    <div className="cards-wrapper">
                    {
                        albums.length ? 
                        albums
                        .map((item, index) => {
                            return <div className="card" key={item.id}>
                                <div className="cover">
                                    <img src={item.images[0]?.url} width="150" height="150" alt={item.name} />
                                    <div className="play-icon">
                                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h4 className="text-elipsis">{item.name}</h4>
                                    <p>{dayjs(item.release_date).year()} • <a href="/artist/06HL4z0CvFAxyc27GXpf02">{item.artists[0].name}</a></p>
                                </div>
                            </div>
                        }) : null
                    }
                    </div>
    
    
    
    
    
                    <h2 className="list-title">Related Artists</h2>
                    <div className="cards-wrapper">
                    {
                        relatedArtists.length ? 
                        relatedArtists
                        .map((item, index) => {
                            return <div className="card" key={item.id}>
                                <div className="cover">
                                    <img src={item.images[0]?.url} width="150" height="150" alt={item.name} />
                                    <div className="play-icon">
                                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h4 className="text-elipsis">{item.name}</h4>
                                    <p>{item.type}</p>
                                </div>
                            </div>
                        }) : null
                    }
                    </div>

                    </>


                    
                }
                









               

            </div>  
        </>
    )
}