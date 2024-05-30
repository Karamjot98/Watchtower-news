import './Dark.css'
import './Light.css'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import React,{useState} from 'react'
import {ThemeContext} from "./context/ThemeContext.js"
import {News,Crypto,Weather,Stocks,Exchange,Contact,About,Movies} from './pages'
const App = () =>{
  const [theme,setTheme] = useState("light");
  const [weather, setWeather] = useState(null);
  const [news,setNews] = useState([]);
  const [sportsNews,setSportsNews] = useState([]);
  const [stocksNews,setStocksNews] = useState([]);
  const [cryptoNews,setCryptoNews] = useState([]);
  const [currentNewsTopic,setCurrentNewsTopic] = useState('news');
  const [stocksData,setStocksData] = useState([])
  const [moviesTopic,setMoviesTopic] = useState('now_playing')
  const [nowPlaying,setNowPlaying] = useState([])
  const [popularMovies,setNowPopularMovies] = useState([])
  const [topRatedMovies,setTopRatedMovies] = useState([])
  const [upcomingMovies,setUpcomingMovies] = useState([])
  return (
    <div className="all flex flex-col bg-white dark:bg-black">
        <ThemeContext.Provider value={{
          upcomingMovies,setUpcomingMovies,
          topRatedMovies,setTopRatedMovies,
          popularMovies,setNowPopularMovies,
          nowPlaying,setNowPlaying,
          theme,setTheme,
          weather,setWeather,
          news,setNews,
          sportsNews,setSportsNews,
          stocksNews,setStocksNews,
          cryptoNews,setCryptoNews,
          currentNewsTopic,setCurrentNewsTopic,
          stocksData,setStocksData,
          moviesTopic,setMoviesTopic}}>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/' element={<News />}></Route>
          <Route path='crypto' element={<Crypto />}></Route>
          <Route path='weather' element={<Weather />}></Route>
          <Route path='stocks' element={<Stocks />}></Route>
          <Route path='exchange' element={<Exchange />}></Route>
          <Route path='news' element={<News />}></Route>
          <Route path='contact' element={<Contact />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='movies' element={<Movies />}></Route>
        </Routes>
      </main>
      <Footer />
      </ThemeContext.Provider>
    </div>
  )
}

export default App
