import React,{useRef,useEffect,useState, useContext} from 'react';
import icon from '../assets/logo_white.svg';
import darkIcon from '../assets/logo_black.svg'
import {NavLink} from 'react-router-dom';

import {DownOutlined ,UpOutlined} from '@ant-design/icons';
import {ThemeContext} from '../context/ThemeContext'
const getLinkClassName = (isActive, theme) => {
  if (isActive) {
    return `block ${theme === 'light' ? "text-black" : "text-white"}`;
  }
  return "block text-slate-500";
};
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
const Header = () => {
  const {theme,setTheme,setCurrentNewsTopic,setMoviesTopic} = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showNewsMenu,setShowNewsMenu] = useState(false)
  const [showMoviesMenu, setShowMoviesMenu] = useState(false);
  const handleTheme = () => {
    if (theme === 'light'){
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }else{
      document.documentElement.classList.remove('dark')
      setTheme('light')
    }
  };
  const newsRef = useRef();
  const moviesRef = useRef();

  useOnClickOutside(newsRef, () => setShowNewsMenu(false));
  useOnClickOutside(moviesRef, () => setShowMoviesMenu(false));
  
  const toggleNewsMenu = () =>{
    setShowNewsMenu(!showNewsMenu)
    setShowMoviesMenu(false);
  }
  const handleMenuToggle = () => {
      setShowMenu(!showMenu);
  };
  const toggleMoviesMenu = () => {
    setShowMoviesMenu(!showMoviesMenu);
    setShowNewsMenu(false);
  };
  
  console.log(document.getElementById("body"))
  return (
    <nav className="bg-white border-gray-200 dark:bg-black">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
        <NavLink className="flex items-center space-x-3 rtl:space-x-reverse" to="news">
          <img className=" h-16 w-auto" src={theme === 'light' ? icon : darkIcon} alt="Logo" />
          
        </NavLink>
        <div className="flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          
          <button data-collapse-toggle="mega-menu" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu" aria-expanded="false" onClick={handleMenuToggle}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div id="mega-menu" className={`items-center justify-between ${showMenu ? 'block' : 'hidden'} w-full lg:flex lg:w-auto `}>
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
            <li ref={newsRef} className="relative">
              <button id="news-dropdown-button" className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" onClick={toggleNewsMenu}>
                News {showNewsMenu ? <UpOutlined /> : <DownOutlined />}
              </button>
              {showNewsMenu && (
                <ul className="absolute left-0 z-10 w-40 p-2 mt-2 text-sm bg-white border border-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <li className="py-1 px-3 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setCurrentNewsTopic('news')}>
                  <NavLink to="news" className={({ isActive }) => getLinkClassName(isActive, theme)}>News</NavLink></li>
                  <li className="py-1 px-3 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setCurrentNewsTopic('sports')}>
                  <NavLink to="news" className={({ isActive }) => getLinkClassName(isActive, theme)}>Sports</NavLink>
                  </li>
                  <li className="py-1 px-3 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setCurrentNewsTopic('crypto')}>
                  <NavLink to="news" className={({ isActive }) => getLinkClassName(isActive, theme)}> Crypto-Bit</NavLink>
                  </li>
                  <li className="py-1 px-3 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setCurrentNewsTopic('stocks')}><NavLink to="news" className={({ isActive }) => getLinkClassName(isActive, theme)}> Stocks</NavLink></li>
                </ul>
              )}
            </li>
            <li ref={moviesRef} className="relative">
              <button id="movies-dropdown-button" className="flex items-center justify-between w-full font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" onClick={toggleMoviesMenu}>
                Movies {showMoviesMenu ? <UpOutlined /> : <DownOutlined />}
              </button>
              {showMoviesMenu && (
                <ul className="absolute left-0 z-10 w-40 p-2 mt-2 text-sm bg-white border border-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <li className="py-1 px-3 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => {setShowMoviesMenu(false);setMoviesTopic('now_playing')
                  }}><NavLink to="movies" className={({ isActive }) => getLinkClassName(isActive, theme)}>Now Playing</NavLink></li>
                  <li className="py-1 px-3 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => {setShowMoviesMenu(false);setMoviesTopic('popular')}}><NavLink to="movies" className={({ isActive }) => getLinkClassName(isActive, theme)}>Popular</NavLink></li>
                  <li className="py-1 px-3 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => {setShowMoviesMenu(false);setMoviesTopic('top_rated')}}><NavLink to="movies" className={({ isActive }) => getLinkClassName(isActive, theme)}>Top Rated</NavLink></li>
                  <li className="py-1 px-3 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => {setShowMoviesMenu(false);setMoviesTopic('upcoming')}}><NavLink to="movies" className={({ isActive }) => getLinkClassName(isActive, theme)}>Upcoming</NavLink></li>
                </ul>
              )}
            </li>
            <li><NavLink to="crypto" className={({ isActive }) => getLinkClassName(isActive, theme)}> Crypto</NavLink></li>
            <li><NavLink to="stocks" className={({ isActive }) => getLinkClassName(isActive, theme)}>Stocks</NavLink></li>
            <li><NavLink to="exchange" className={({ isActive }) => getLinkClassName(isActive, theme)}>Exchange</NavLink></li>
            <li><NavLink to="weather" className={({ isActive }) => getLinkClassName(isActive, theme)}>Weather</NavLink></li>
            
          </ul>
          <button onClick={handleTheme} className={`${theme}-theme-button flex h-8 w-16 border-2 self-center mx-5 items-center flex-shrink-0 rounded-full`}>
          <div className={`${theme}-button-circle h-6 w-8 border-2 rounded-full mx-1`}></div>
        </button>
        </div>
        
      </div>
    </nav>
  );
}

export default Header;