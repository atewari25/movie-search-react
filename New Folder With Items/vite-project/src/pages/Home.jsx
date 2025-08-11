import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import '../css/Home.css'
import {searchMovies, getPopularMovies} from "../services/api"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies,setMovies] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    const [count,setCount] = useState(0);

    useEffect(()=>{
       const loadPopularMovies = async () =>{
        try{
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        }
        catch(error){
           setError('Failed to load movie, error is: ',error);
        }
        finally{
             setLoading(false);
        }
       } 
       loadPopularMovies();
    },[]);

    useEffect(()=>{
        setCount(count+1);
        console.log("ozy",count);
    },[])

     const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return
        if(loading) return

        setLoading(true);
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        }
        catch(err){
            console.log(err);
            setError("Failed to get result") 
        }
        finally{
            setLoading(false)
        }
    }

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input 
             type="text"
             placeholder="Search for a movies..." 
             className="search-input" 
             value={searchQuery}
             onChange={(e)=>
                setSearchQuery(e.target.value)
            }
             />
            <button type="submit" className="search-button"> Search </button>
        </form>

        {error && <div className="error"> {error} </div>}

        {loading ? <div className="loading">Loading...</div> :
            <div className="movies-grid">
                {movies.map(movie => {
                    return <MovieCard movie={movie} key={movie.id} />
                })}
            </div>}
    </div>
}

export default Home