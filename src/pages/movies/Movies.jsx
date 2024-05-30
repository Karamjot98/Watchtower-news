import React,{useContext,useState,useEffect} from 'react'
import MovieCard from './components/MovieCard'
import { useMoviesFetch } from '../../hooks/useMoviesFetch'
import {ThemeContext} from '../../context/ThemeContext'
export const Movies = () => {
  const { moviesTopic } = useContext(ThemeContext);
  const {data, loading, error} = useMoviesFetch(moviesTopic)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching movies: {error.message}</div>;
  }
  // Function to render content based on moviesTopic
  const renderContent = () => {
    switch (moviesTopic) {
      case 'now_playing':
        return <h1>Now Playing Movies</h1>;
      case 'upcoming':
        return <h1>Upcoming Movies</h1>;
      case 'popular':
        return <h1>Popular Movies</h1>;
      case 'top_rated':
        return <h1>Top Rated Movies</h1>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white'>
        {renderContent()}
      </div>
      
      <div className='flex flex-wrap justify-center items-center'>
      {
        data.map((movie)=>(
          <MovieCard key={movie.id} movie={movie}/>
        ))
      }
      
    </div>
    </div>
    
  )
}
