import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import icon from '../../assets/crypto.png'
import {ThemeContext} from "../../context/ThemeContext.js"
const NewsCard = ({article}) => {
const {theme} = useContext(ThemeContext);
{`${theme === 'dark'?null:null}`}
  return (
    <div className='m-4 max-w-sm  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-white border border-gray-200'>
    <Link to="#">
        <img className="rounded-t-lg h-56 w-full" src={article.urlToImage?article.urlToImage:icon} alt='hello' />
    </Link>
    <div className="p-5">
        <Link to="#">
            <h5 className={`mb-2 text-2xl font-bold tracking-tight  ${theme === 'dark'?' text-white':' text-gray-900 '}`}>{article.title}</h5>
        </Link>
        <p className={`mb-3 font-normal   ${theme === 'dark'?' text-gray-400':' text-gray-700'}`}>{article.content}</p>
        <Link to={article.url} target='_blank' className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center  rounded-lg  focus:ring-4 focus:outline-none ${theme === 'dark'?' bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 ':' text-white bg-blue-700 focus:ring-blue-300 hover:bg-blue-800'}`}>
            Read more
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>
    </div>
</div>
  )
}

export default NewsCard
