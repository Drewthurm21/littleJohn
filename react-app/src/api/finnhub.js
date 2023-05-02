const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c2pcsqiad3i8659ioib0"
const finnhubClient = new finnhub.DefaultApi()

export const getTickerData = (ticker) => {
  return finnhubClient.quote(ticker, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response)
      console.log(data)
      return data;
    }
  });
}