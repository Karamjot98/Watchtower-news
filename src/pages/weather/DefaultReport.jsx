import React, {useContext, useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import {ThemeContext} from "../../context/ThemeContext.js"
const DefaultReport = () => {
  const {theme} = useContext(ThemeContext);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const cities = [
      { name: 'Ottawa', lat: 45.4209, lon: -75.6901 },
      { name: 'Toronto', lat: 43.7001, lon: -79.4163 },
      { name: 'Vancouver', lat: 49.2827, lon: -123.1207 }
    ];

    const apiKey = "98bf66eb4873fdfcdaf095afae6ebb27";  // Use your actual API key
    async function fetchWeatherData() {
      try {
        const responses = await Promise.all(cities.map(city =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`)
        ));

        const data = responses.map((response, index) => {
          const { weather, main, wind, sys, name } = response.data;
          return {
            city: name, // The city name from the API response
            temp: main.temp,
            feelsLike: main.feels_like,
            weatherIcon: weather[0].icon,
            description: weather[0].description,
            minTemp: main.temp_min,
            maxTemp: main.temp_max,
            windSpeed: wind.speed
          };
        });

        setWeatherData(data);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    }

    fetchWeatherData();
  }, []);

  return (
    <div className='defaultReport flex flex-wrap justify-center items-center'>
      {weatherData.map((data, index) => (
        <WeatherCard key={index} {...data} />
      ))}
    </div>
  );
}

export default DefaultReport;