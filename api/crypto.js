// api/crypto.js
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const listingsResponse = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.CMC_API_KEY}&start=1&limit=200&sort=market_cap&sort_dir=desc`);

    const cryptoList = listingsResponse.data.data;
    const ids = cryptoList.map(crypto => crypto.id).join(',');
    console.log(cryptoList)
    const metadataResponse = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=${process.env.CMC_API_KEY}&id=${ids}&aux=logo,urls`);

    const combinedData = cryptoList.map(crypto => ({
      ...crypto,
      logo: metadataResponse.data.data[crypto.id].logo,
      website: metadataResponse.data.data[crypto.id].urls.website[0],
    }));

    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
};