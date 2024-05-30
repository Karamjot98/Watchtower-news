import React from 'react'
import {Link} from 'react-router-dom'

const MovieCard = ({movie}) => {
    const {id,release_date, title,overview,poster_path} = movie
    const image = `https://image.tmdb.org/t/p/w500/${poster_path}`
  return (
    <div className="movie-card m-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-scroll">
        <Link to='#'>
            <img className=' movie-image w-full' src={image} alt="" />
        </Link>
        <div className="p-5">
            <Link to='#'>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            </Link>
            <p className='dark:text-white'><span className='font-bold'>Release Date: </span>{release_date}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{overview}</p>
            
        </div>
    </div>

  )
}

export default MovieCard
