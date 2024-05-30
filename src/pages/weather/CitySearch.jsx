import React,{useRef,useContext, useState,useEffect } from 'react';
import citiesData from '../../../sorted_cities.json';  // Make sure the path matches where you store your cities data
import indexMap from '../../../city_index_map.json';  // Make sure the path matches where you store your index map
import axios from 'axios';
import WeatherCard from './WeatherCard';
import {ThemeContext} from "../../context/ThemeContext.js"

function useOnClickOutside(ref, handler) {
  useEffect(() => {
      const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
              return;
          }
          handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
      };
  }, [ref, handler]); // Reload only if ref or handler changes
}

const CitySearch = () => {
  const {theme,weather,setWeather} = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const ref = useRef();

    useOnClickOutside(ref, () => setIsDropdownVisible(false));
  

  const handleSearch = event => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredCities([]);
      setSelectedCity(null);
      setWeather(null);
      setIsDropdownVisible(false);
    } else {
      const firstLetter = value[0];
      console.log(`First letter: ${firstLetter}`);
      const range = indexMap[firstLetter]; // Assuming indexMap is loaded correctly
      console.log(`Range for ${firstLetter}:`, range);
      
      if (range) {
        // Only filter cities within the specified index range
        const limitedCities = citiesData.slice(range.startIndex, range.endIndex + 1);
        const filtered = limitedCities.filter(city => city.city.toLowerCase().startsWith(value));
        setFilteredCities(filtered);
        console.log(`Filtered Cities:`, filtered);
        setIsDropdownVisible(true);
      } else {
        setFilteredCities([]);
        setIsDropdownVisible(false);
      }
    }
  };


  const selectCity = (city) => {
    setSelectedCity(city);
    setSearchTerm(city.city);  // Update the search bar with the selected city
    setFilteredCities([]);
    setIsDropdownVisible(false);
  };

  const handleButtonClick = () => {
    console.log(selectedCity)
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  };

  const fetchWeather = (city) => {
    const apiKey = '98bf66eb4873fdfcdaf095afae6ebb27';  // Use your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lng}&appid=${apiKey}&units=metric`;
    axios.get(url)
      .then(response => {
        const { data } = response;
        const { weather, main, wind, sys } = data;
        console.log(response.data);
        setWeather({
          city: data.name,
          temp: main.temp,
          feelsLike: main.feels_like,
          weatherIcon: weather[0].icon,
          description: weather[0].description,
          minTemp: main.temp_min,
          maxTemp: main.temp_max,
          windSpeed: wind.speed,
          country: sys.country,  // Optional: add country if you plan to display it
        });
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        setWeather(null);
        console.log(selectCity.lat)
      });
  };

  return (
    <div ref={ref} className='  flex flex-wrap justify-center items-center'>
      <span>
        <input
        className='border border-black rounded-lg'
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '10px', margin: '10px', width: '300px' }}
        />
        {isDropdownVisible && filteredCities.length > 0 ? (
          <ul className="absolute w-80 z-10 bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-60 overflow-y-auto">
            {filteredCities.map((city, index) => (
              <li key={index} className="p-2 hover:bg-gray-100"
              onClick={() => selectCity(city)}>
                {city.city} - {city.country}
              </li>
            ))}
          </ul>
        ) : (
          isDropdownVisible && searchTerm && <p className="absolute w-80 bg-white mt-1 overflow-x-auto p-2">No cities found for your search.</p>
        )}
      </span>
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleButtonClick}>Search</button>
      {weather && <WeatherCard {...weather} />}
    </div>
  );
};

export default CitySearch;