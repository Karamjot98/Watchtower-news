import {useState,useEffect,useContext} from 'react'
import {ThemeContext} from '../context/ThemeContext'
const cache = {};
export const useMoviesFetch = (api) => {
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `https://api.themoviedb.org/3/movie/${api}?api_key=65fb6c02d81de0e3eadf5d328933874b`
    
    useEffect(() => {
        if (cache[api]) {
            // Use cached data
            console.log('data already here ')
            console.log(cache[api])
            console.log('---------- ')
            setData(cache[api]);
            setLoading(false);
          } else {
            // Fetch data from API
            async function fetchMovies() {
              try {
                const response = await fetch(url);
                const json = await response.json();
                cache[api] = json.results; // Cache the data
                setData(json.results);
                setLoading(false);
              } catch (error) {
                setError(error);
                setLoading(false);
              }
            }
            fetchMovies();
          }
      }, [api,url]); // `url` changes when `api` changes
    
      return { data , loading, error};
    };