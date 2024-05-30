import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from "../../context/ThemeContext";
import axios from 'axios';

export const Crypto = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrypto = async () => {
      try{
        const response = await axios.get('/api/crypto');  // Adjust this path based on your deployment
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setCryptoData(response.data);
        } else {
          console.log(response.data)
          setError(new Error('Unexpected response format'));
        }
      } catch (error) {
        console.log(response.data)
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrypto();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const handleRowClick = (url) => {
    window.open(url, '_blank');
  };
  return (
    <div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10'>
            <tr>
              <th scope='col' className='px-6 py-3'>#</th>
              <th scope='col' className='px-6 py-3'>Name</th>
              <th scope='col' className='px-6 py-3'>Symbol</th>
              <th scope='col' className='px-6 py-3'>Price</th>
              <th scope='col' className='px-6 py-3'>Market Cap</th>
              <th scope='col' className='px-6 py-3'>24h Volume</th>
              <th scope='col' className='px-6 py-3'>1h %</th>
              <th scope='col' className='px-6 py-3'>24h %</th>
              <th scope='col' className='px-6 py-3'>7d %</th>
              
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr onClick={() => handleRowClick(crypto.website)} key={crypto.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='px-6 py-4'>{index + 1}</td>
                <td className='flex px-6 py-4 items-center'><img className='mx-1' src={crypto.logo} alt={crypto.name} width="32" height="32" />{crypto.name}</td>
                <td className='px-6 py-4'>{crypto.symbol}</td>
                <td className='px-6 py-4'>${crypto.quote.USD.price.toFixed(2)}</td>
                <td className='px-6 py-4'>${crypto.quote.USD.market_cap.toFixed(2)}</td>
                <td className='px-6 py-4'>${crypto.quote.USD.volume_24h.toFixed(2)}</td>
                <td className={`px-6 py-4 ${crypto.quote.USD.percent_change_1h < 0 ? 'text-red' : 'text-green'}`}>{crypto.quote.USD.percent_change_1h.toFixed(2)}%</td>
                <td className={`px-6 py-4 ${crypto.quote.USD.percent_change_24h < 0 ? 'text-red' : 'text-green'}`}>{crypto.quote.USD.percent_change_24h.toFixed(2)}%</td>
                <td className={`px-6 py-4 ${crypto.quote.USD.percent_change_7d < 0 ? 'text-red' : 'text-green'}`}>{crypto.quote.USD.percent_change_7d.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
