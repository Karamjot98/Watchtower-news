// WeatherCard.jsx
import React,{useContext} from 'react';
import {ThemeContext} from "../../context/ThemeContext.js"

const WeatherCard = ({ city, temp, feelsLike, weatherIcon, description, minTemp, maxTemp, windSpeed}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <div className={`m-2 p-2 h-32 border border-gray-200 rounded-lg shadow flex flex-col items-center justify-center ${theme=== 'dark'?'text-white bg-gray-800 border-gray-700':''}`}>
      <h3 className="text-lg font-bold">{city}</h3>
      <div className='flex items-center space-x-4'>
        <span>
          <img src={`http://openweathermap.org/img/wn/${weatherIcon}.png`} alt="Weather Icon" className="my-2" />
          <p className="text-sm">{description}</p>
        </span>
        <span>
        <p className={`text-sm `}>Temperature: {temp}°C </p>
        <p className={`text-sm `}>Feels like: {feelsLike}°C</p>
        <p className="text-sm">Min: {minTemp}°C | Max: {maxTemp}°C</p>
        <p className="text-sm">Wind: {windSpeed} m/s</p>
        </span>
      </div>
      
      
    </div>
  );
}

export default WeatherCard;