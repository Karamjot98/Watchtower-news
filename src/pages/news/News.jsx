import React,{useContext,useState,useEffect} from 'react'
import NewsCard from './NewsCard'
import {ThemeContext} from "../../context/ThemeContext.js"
export const News = () => {
  const {theme,news,setNews,setSportsNews,sportsNews,stocksNews,setStocksNews,cryptoNews,setCryptoNews,currentNewsTopic} = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedNews, setPaginatedNews] = useState([]);
  const itemsPerPage = 9;
  
  const [topic,setTopic] = useState([])
  const totalPages = Math.ceil(topic.length / itemsPerPage);
  useEffect(()=>{
    if(currentNewsTopic === 'news'){
      async function fetchUsNews() {
        if(news.length === 0){
          try {
            const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=909e231dfad642bf827a616d1b56de48");
            const data = await response.json();
            setNews(data.articles);
            setTopic(news)
            console.log(data.articles)
            console.log("News fetched and set in context");
          } catch (error) {
            console.error("Failed to fetch news", error);
          }
        }else{
          setTopic(news)
          console.log("Using news from context");
        }
      }
      fetchUsNews();
    }else if(currentNewsTopic === 'sports'){
      async function fetchSportsNews() {
        if(sportsNews.length === 0){
          try {
            const response = await fetch("https://newsapi.org/v2/everything?q=sports&apiKey=909e231dfad642bf827a616d1b56de48");
            const data = await response.json();
            setSportsNews(data.articles);
            setTopic(sportsNews)
            console.log(data.articles)
            console.log("Sports News fetched and set in context");
          } catch (error) {
            console.error("Failed to fetch news", error);
          }
        }else{
          setTopic(sportsNews)
          console.log("Using sports news from context");
        }
      }
      fetchSportsNews();
    }else if(currentNewsTopic === 'crypto'){
      async function fetchCryptoNews() {
        if(cryptoNews.length === 0){
          try {
            const response = await fetch("https://newsapi.org/v2/everything?q=crypto&apiKey=909e231dfad642bf827a616d1b56de48");
            const data = await response.json();
            setCryptoNews(data.articles);
            setTopic(cryptoNews)
            console.log(data.articles)
            console.log("crypto News fetched and set in context");
          } catch (error) {
            console.error("Failed to fetch crypto news", error);
          }
        }else{
          setTopic(cryptoNews)
          console.log("Using crypto news from context");
        }
      }
      fetchCryptoNews();
    }else if(currentNewsTopic === 'stocks'){
      async function fetchStocksNews() {
        if(stocksNews.length === 0){
          try {
            const response = await fetch("https://newsapi.org/v2/everything?q=stocks&apiKey=909e231dfad642bf827a616d1b56de48");
            const data = await response.json();
            setStocksNews(data.articles);
            setTopic(stocksNews)
            console.log(data.articles)
            console.log("Stocks News fetched and set in context");
          } catch (error) {
            console.error("Failed to fetch stock news", error);
          }
        }else{
          setTopic(stocksNews)
          console.log("Using stock news from context");
        }
      }
      fetchStocksNews();
    }
    setCurrentPage(0)
  }, [currentNewsTopic,topic]);

  useEffect(() => {
    // Calculate the slice of news to show based on the current page
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    console.log("setting paginated news")
    setPaginatedNews(topic.slice(start, end));
  }, [topic,currentPage]);

  const handleNext = () => {
    // Increment page count if not at the last page
    if ((currentPage + 1)  < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log(currentPage)
    }
  };

  const handlePrev = () => {
    // Decrement page count if not at the first page
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      console.log(currentPage)
    }
  };

  return (
< >
<div className={`${theme=== 'dark'?'text-white':''}`}>
    <div className='page h-10 flex justify-center items-center'>
      <button onClick={handlePrev} className={`rounded-full border w-16 border-black m-5 ${theme === 'dark'?' border-white':null}`}>prev</button>
      <span>{currentPage + 1} of {totalPages}</span>
      <button onClick={handleNext} className={`rounded-full border w-16 border-black m-5 ${theme === 'dark'?' border-white':null}`}>next</button>
    </div>
    <div className='flex flex-wrap justify-center items-center'>
      { paginatedNews.map((article) => (
        article.title !== "[Removed]" ? <NewsCard article={article}/> : null
      ))
      }
    </div>
    <div className='page h-10 flex justify-center items-center'>
      <button onClick={handlePrev} className={`rounded-full border w-16 border-black m-5 ${theme === 'dark'?' border-white':null}`}>prev</button>
      <span>{currentPage + 1} of {totalPages}</span>
      <button onClick={handleNext} className={`rounded-full border w-16 border-black m-5 ${theme === 'dark'?' border-white':null}`}>next</button>
    </div>
</div>
</>
  )
}
