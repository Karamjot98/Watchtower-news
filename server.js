import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 5001;

app.use(cors());

app.get('/api/crypto', async (req, res) => {
  try {
    // Fetch cryptocurrency listings
    const listingsResponse = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=98fe10e3-b577-44a3-81c5-d748b71fc52d&start=1&limit=200&sort=market_cap&sort_dir=desc'
    );

    const cryptoList = listingsResponse.data.data;
    const ids = cryptoList.map(crypto => crypto.id).join(',');

    // Fetch metadata using the extracted IDs
    const metadataResponse = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=98fe10e3-b577-44a3-81c5-d748b71fc52d&id=${ids}&aux=logo,urls`
    );

    // Combine the listings and metadata into a single response
    const combinedData = cryptoList.map(crypto => ({
      ...crypto,
      logo: metadataResponse.data.data[crypto.id].logo,
      website: metadataResponse.data.data[crypto.id].urls.website[0],
    }));
    console.log(combinedData)
    // Send the combined response
    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/convert', async (req, res) => {
  const { amount, fromCurrencyId, toCurrencyIds } = req.query;

  if (!amount || !fromCurrencyId || !toCurrencyIds) {
    return res.status(400).send('Missing required parameters');
  }

  try {
    const convertResponse = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?CMC_PRO_API_KEY=98fe10e3-b577-44a3-81c5-d748b71fc52d&amount=${amount}&id=${fromCurrencyId}&convert_id=${toCurrencyIds}`
    );

    res.json(convertResponse.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching conversion data');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
