import { useEffect } from "react";
import { useMovieContext } from "../context/MovieContext"
import { useParams } from "react-router-dom"
import "../css/MovieDetails.css"

function MovieDetails(){
    const {movieDetail,setMovieDetail} = useMovieContext();
    const { movieId } = useParams(); // Get movieId from URL
    console.log("Movie ID from URL:", movieId)
    console.log(movieDetail)

    useEffect(()=>{
        const saved = localStorage.getItem('selectedMovie');
        if(saved){
            setMovieDetail(JSON.parse(saved));
        }
    },[])
    
    if (!movieDetail) {
        return (
            <div className="no-movie-selected">
                <h2>No movie selected</h2>
                <p>Please go back to the home page and select a movie.</p>
            </div>
        );
    }
    
    return (
     <div className="movie-card-detail">
        <div >
            <img src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} alt="movie.title"/> 
        </div>
        <div className="movie-info-detail">
            <h3>
                {movieDetail.title}
            </h3>
            <p>{movieDetail.release_date?.split("-")[0]}</p>
            <div>{movieDetail.overview}</div>
        </div>

    </div>
    )
}

export default MovieDetails