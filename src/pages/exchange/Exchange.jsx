import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.js';
import axios from 'axios';
import currencies from './currencies.json';

export const Exchange = () => {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  // Sort currencies alphabetically by name
  const sortedCurrencies = currencies.sort((a, b) => a.name.localeCompare(b.name));

  const handleConvert = async () => {
    try {
      setError(null); // Reset error state
      const response = await axios.get('http://localhost:5001/api/convert', {
        params: {
          amount,
          fromCurrencyId: baseCurrency,
          toCurrencyIds: targetCurrency
        }
      });
      setConversionResult(response.data);
    } catch (error) {
      console.error('Error converting currency:', error);
      setError(error.response ? error.response.data : 'Error converting currency');
    }
  };

  const getCurrencyName = (id) => {
    const currency = currencies.find(currency => currency.id === parseInt(id));
    return currency ? currency.name : id;
  };

  return (
    <div className={'currency-converter dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-white border border-gray-200'}>
      <h1>Currency Converter</h1>
      <div>
        <label>
          Amount:
          <input
            className='dark:text-black border-black border rounded-md'
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Base Currency:
          <select
            className='dark:text-black'
            value={baseCurrency}
            onChange={e => setBaseCurrency(e.target.value)}
          >
            <option value="">Select Currency</option>
            {sortedCurrencies.map(currency => (
              <option key={currency.id} value={currency.id}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label >
          Target Currency:
          <select
          className='dark:text-black'
            value={targetCurrency}
            onChange={e => setTargetCurrency(e.target.value)}
          >
            <option value="">Select Currency</option>
            {sortedCurrencies.map(currency => (
              <option key={currency.id} value={currency.id}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleConvert}>Convert</button>
      {error && <div className="error">Error: {error}</div>}
      {conversionResult && (
        <div>
          <h2>Conversion Results:</h2>
          <div>
            <p><strong>Base Currency:</strong> {conversionResult.name} ({conversionResult.symbol})</p>
            <p><strong>Amount:</strong> {conversionResult.amount}</p>
            {Object.entries(conversionResult.quote).map(([targetId, data]) => (
              <div key={targetId}>
                <p><strong>Target Currency:</strong> {getCurrencyName(targetId)}</p>
                <p><strong>Converted Amount:</strong> {data.price.toFixed(2)}</p>
                <p><strong>Last Updated:</strong> {new Date(data.last_updated).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
