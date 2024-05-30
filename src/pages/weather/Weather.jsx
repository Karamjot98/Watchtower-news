import React,{useContext} from 'react'
import DefaultReport from './DefaultReport'
import CitySearch from './CitySearch';
import {ThemeContext} from "../../context/ThemeContext.js"
export const Weather = () => {
  const {theme} = useContext(ThemeContext);
  const location  = ""
  return (
    <div className='weather'>
    <DefaultReport/>
    <CitySearch />
    </div>
  )
}
// <DefaultReport/>