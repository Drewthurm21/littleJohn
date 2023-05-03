import { fetchCompanyQuote } from './api/alphaVantage';
import { StyledDiv, StyledSpan } from './components/styledComponents/misc';

/* CHART UTILITIES */
export function customizeChartTooltip(arg) {
  return {
    text: `${arg.argumentText}: ${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
  };
}

export function createHoldingsData(portfolio) {
  const holdings = {
    USD: { stock: 'USD', quantity: portfolio.balance, value: portfolio.balance, lastPrice: 1 },
  };

  for (let trade of Object.values(portfolio.trades)) {
    const { ticker, quantity, price, trade_type } = trade;

    if (ticker in holdings) {
      let item = holdings[ticker];
      if (trade_type === 'buy') {
        item.quantity += quantity;
        item.value += quantity * price;
        item.lastPrice = price;
      } else {
        item.quantity -= quantity;
        item.value -= quantity * price;
        item.lastPrice = price;
      }
      continue;
    }

    holdings[ticker] = {
      stock: ticker,
      quantity: quantity,
      value: quantity * price,
      lastPrice: price,
    }
  }
  return Object.values(holdings);
}

export function consolidatePortfolioHoldings(portfolios) {
  //consolidate holdings into one object
  const allHoldings = Object.values(portfolios)  //returns array of portfolios

    //map over the portfolios to create a holdings array for each
    .map(portfolio => createHoldingsData(portfolio))

    //reduce the holdings arrays into one object to combine all stock positions
    .reduce((acc, holdings) => {
      for (let holding of holdings) {
        if (acc[holding.stock]) {
          acc[holding.stock].quantity += holding.quantity;
          acc[holding.stock].value += holding.value;
        } else {
          acc[holding.stock] = holding;
        }
      }
      return acc
    }, {})
  return Object.values(allHoldings)
};

export function createLineItem(label, value) {
  if (label === 'break') {
    return <StyledDiv content=' ' h='1vh' margin='0 0 4vh 0'
      bottomBorder />
  }

  const color = value >= 0 ? 'var(--erie-black)' : 'var(--red-500)'
  return (
    <StyledDiv w='85%' margin='0 0 1vh 0' spaceBetween>
      <StyledDiv txMedium>{label}:</StyledDiv>
      <StyledDiv txMedium>$
        <StyledSpan txMedium txColor={color}>{value}</StyledSpan>
      </StyledDiv>
    </StyledDiv>
  )
};

export const getPrice = async (ticker, apiKey) => {
  let quote = await fetchCompanyQuote(ticker, apiKey)
  return quote
}

export const loadPrices = async (holdings, apiKey) => {
  // create array of promises that will return price info when resolved
  let allPrices = holdings.map(({ ticker }) => getPrice(ticker, apiKey))
  let priceData = await Promise.allSettled(allPrices)

  return priceData
};

// Create our number formatter.
export const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});