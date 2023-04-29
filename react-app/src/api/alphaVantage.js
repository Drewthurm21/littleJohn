
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
  search: ['SYMBOL_SEARCH', 'bestMatches']
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
  const { daily } = avQueryFunctions

  const res = await fetch(`${baseUrl}function=${daily[0]}&output=compact&interval=1min&symbol=${ticker}&date=${pastDates.oneMonth}&apikey=${apiKey}`)
  const parsedData = await res.json()

  if (parsedData["Error Message"] || !parsedData) {

    return { error: 'max api calls =[', tickerData: [0], currentPrice: 0, movement: 0 }
  } else {
    let _data = Object.values(parsedData[daily[1]]).reverse()
    const tickerData = _data.reduce((acc, curr) => {
      acc.push(curr["4. close"])
      return acc
    }, [])
    const startingPrice = _data[0]["4. close"]
    const currentPrice = _data[99]["4. close"]
    const movement = ((currentPrice - startingPrice) / startingPrice) * 100

    console.log({ tickerData, currentPrice, movement })

    return { tickerData, currentPrice, movement }
  }
};