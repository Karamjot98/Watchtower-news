import React,{useContext} from 'react'
import {ThemeContext} from "../../context/ThemeContext.js"
export const About = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <div>About</div>
  )
}
