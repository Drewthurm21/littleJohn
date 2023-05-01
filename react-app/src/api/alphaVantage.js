
const baseUrl = 'https://www.alphavantage.co/query?'
const avQueryFunctions = {
  intraday: ['TIME_SERIES_INTRADAY', 'Time Series (1min)'],
  daily: ['TIME_SERIES_DAILY', 'Time Series (Daily)'],
  dailyAdjusted: ['TIME_SERIES_DAILY_ADJUSTED', 'Time Series (Daily)'],
  weekly: ['TIME_SERIES_WEEKLY', 'Weekly Time Series'],
  weeklyAdjusted: ['TIME_SERIES_WEEKLY_ADJUSTED', 'Weekly Adjusted Time Series'],
  monthly: ['TIME_SERIES_MONTHLY', 'Monthly Time Series'],
  monthlyAdjusted: ['TIME_SERIES_MONTHLY_ADJUSTED', 'Monthly Adjusted Time Series'],
  quote: ['GLOBAL_QUOTE', 'Global Quote'],
  search: ['SYMBOL_SEARCH', 'bestMatches'],
  news: ['NEWS_SENTIMENT', 'feed']
}

const today = new Date()
const pastDates = {
  oneMonth: new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()),
  threeMonths: new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()),
  sixMonths: new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()),
  oneYear: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
  twoYears: new Date(today.getFullYear() - 2, today.getMonth(), today.getDate()),
  fiveYears: new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()),
}

export const getSparklineData = async (ticker, apiKey) => {
  const [queryType, dataKey] = avQueryFunctions["daily"]
  const res = await fetch(`${baseUrl}function=${queryType}&apikey=${apiKey}&output=compact&interval=1min&symbol=${ticker}`)
  const parsedData = await res.json()

  if (parsedData["Error Message"] || !parsedData) {
    return { error: 'max api calls =[', tickerData: [0], currentPrice: 0, movement: 0 }
  }

  let _data = Object.values(parsedData[dataKey]).reverse()
  const tickerData = _data.reduce((acc, curr) => {
    acc.push(curr["4. close"])
    return acc
  }, [])
  const startingPrice = _data[0]["4. close"]
  const currentPrice = _data[99]["4. close"]
  const movement = ((currentPrice - startingPrice) / startingPrice) * 100

  return { tickerData, currentPrice, movement }
};

export const getGeneralNews = async (apiKey) => {
  const { news } = avQueryFunctions
  const res = await fetch(`${baseUrl}function=${news[0]}&apikey=${apiKey}`)
  const parsedData = await res.json()

  if (parsedData["Error Message"] || !parsedData) {
    return { error: 'max api calls =[', tickerData: [0], currentPrice: 0, movement: 0 }
  }

  const { feed } = parsedData

  return feed
}