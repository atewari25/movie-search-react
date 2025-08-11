import { useContext,createContext,useEffect,useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites,setFavorites] = useState([]);

    useEffect(()=>{
        const storedFavs = localStorage.getItem("favorites");
        if(storedFavs) setFavorites(JSON.parse(storedFavs))

    },[])

    useEffect(()=>{
        localStorage.setItem('favorites',JSON.stringify(favorites));
    },[favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev,movie]);
    }

    const removeFromFavorties = (movieId) => {
        setFavorites(prev => prev.filter(movie=>movie.id!=movieId));
    }

    const isFavorties = (movieId) => {
        return favorites.some(movie=>movie.id===movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorties,
        isFavorties
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}