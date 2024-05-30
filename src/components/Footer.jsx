import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom';
import {ThemeContext} from '../context/ThemeContext'
const Footer = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <footer className={`footer-${theme}-theme justify-end`}>
      <nav>
        <ul>
          <li>
            <NavLink to='about' className={({isActive})=>
          `block ${isActive ? `${theme === 'light' ? "text-black":"text-white"}`: "text-slate-500"}`}>About us</NavLink>
          </li>
          <li>
            <NavLink to='contact' className={({isActive})=>
          `block ${isActive ? `${theme === 'light' ? "text-black":"text-white"}`: "text-slate-500"}`}>Contact us</NavLink>
          </li>
        </ul>
      </nav>

    </footer>
  )
}

export default Footer;
