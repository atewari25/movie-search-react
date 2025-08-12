import '../css/MovieCard.css'
import { useMovieContext } from '../context/MovieContext'
import { useNavigate } from 'react-router-dom'

function MovieCard({movie}){
    const {isFavorties, removeFromFavorties, addToFavorites, setMovieDetail} = useMovieContext();

    const favortie = isFavorties(movie.id);
    const navigate = useNavigate();

     function onFavoriteClick(e){
        e.preventDefault();
        if(favortie) removeFromFavorties(movie.id);
        else addToFavorites(movie);
    }
    function onHandleClick(){
        setMovieDetail(movie);
        localStorage.setItem("selectedMovie",JSON.stringify(movie))
        navigate(`/movie-details/${movie.id}`);
    }

    return <div  to="/movie-details" onClick={onHandleClick}>
     <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie.title"/> 
            <div className="movie-overlay">
                <button className={`favorite-btn ${favortie?"active":""}`} onClick={onFavoriteClick}>♥</button>
            </div>
        </div>
        <div className="movie-info">
            <h3>
                {movie.title}
            </h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>

    </div>
    </div>

}

export default MovieCard