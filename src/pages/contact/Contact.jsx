import React,{useContext} from 'react'
import {ThemeContext} from "../../context/ThemeContext.js"
export const Contact = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <div>Contact</div>
  )
}
