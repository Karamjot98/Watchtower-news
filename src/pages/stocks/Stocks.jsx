import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from "../../context/ThemeContext.js";
import axios from 'axios';

export const Stocks = () => {
  const {stocksData, setStocksData } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const stocksPerPage = 50;
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchStocks = async () => {
      const url = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=T5pJYNYotQBzUNExgii12eAXh61Snvpn`;
      try {
        const response = await axios.get(url);
        const sortedResults = response.data.results.sort((a, b) => a.T.localeCompare(b.T));
        setStocksData(sortedResults);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    if (stocksData.length === 0) {
      fetchStocks();
    } else {
      console.log('Data already there');
    }
  }, [stocksData, setStocksData]);

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipText, setTooltipText] = useState('');

  const handleMouseEnter = (event, text) => {
    setTooltipText(text);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const filteredStocks = stocksData.filter(stock =>
    stock.T.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = filteredStocks.slice(indexOfFirstStock, indexOfLastStock);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setInputPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) > 0 && Number(value) <= totalPages)) {
      setInputPage(value);
    }
  };

  const handleInputBlur = () => {
    if (inputPage !== '') {
      handlePageChange(Number(inputPage));
    } else {
      setInputPage(currentPage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputPage !== '') {
      handlePageChange(Number(inputPage));
    }
  };

  const totalPages = Math.ceil(stocksData.length / stocksPerPage);

  return (
    <div className='flex flex-col justify-center items-center dark:text-white'>
      <div className='md:flex items-center'>
        <div>
          <label for="table-search" class="sr-only">Search</label>
          <div class="relative">
                <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}></input>
          </div>
        </div>
        <div className='pagination flex items-center'>
          <button
            className={'rounded-full border w-16 border-black m-5 dark:border-white'}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <input
            className='dark:border-white border-black border rounded px-2 mx-1 text-center bg-transparent'
            type='number'
            value={inputPage}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyPress}
            min='1'
            max={totalPages}
          />
          <span className='mx-1'>/ {totalPages}</span>
          <button
            className='rounded-full border w-16 border-black m-5 dark:border-white'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full'>
        <table className='w-full text-xs text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-3 py-3'>Symbol</th>
              <th scope='col' className='px-4 py-3'>Volume</th>
              <th scope='col' className='px-4 py-3'>Avg. Price</th>
              <th scope='col' className='px-4 py-3'>Open</th>
              <th scope='col' className='px-3 py-3'>Close</th>
              <th scope='col' className='px-3 py-3'>High</th>
              <th scope='col' className='px-3 py-3'>Low</th>
            </tr>
          </thead>
          <tbody>
            {currentStocks.map((stock, index) => (
              <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='px-3 py-4'>{stock.T}</td>
                <td className='px-4 py-4'>{stock.v}</td>
                <td className='px-4 py-4'>{stock.vw}</td>
                <td className='px-4 py-4'>{stock.o}</td>
                <td className='px-3 py-4'>{stock.c}</td>
                <td className='px-3 py-4'>{stock.h}</td>
                <td className='px-3 py-4'>{stock.l}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination flex items-center'>
        <button
          className='rounded-full border w-16 border-black m-5 dark:border-white'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <input
          className='dark:border-white border-black border rounded px-2 mx-1 text-center bg-transparent'
          type='number'
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
          min='1'
          max={totalPages}
        />
        <span className='mx-1'>/ {totalPages}</span>
        <button
          className='rounded-full border w-16 border-black m-5 dark:border-white'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
