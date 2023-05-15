import { useEffect, useState } from 'react';
import { StyledDiv } from '../styledComponents/misc';
import { createHoldingsData, usdFormatter } from '../../utilities';


export default function PortfolioCard({ portfolio }) {
  const [portfolioHoldings, setPortfolioHoldings] = useState([])
  const [portfolioValue, setPortfolioValue] = useState(0)

  useEffect(() => {
    setPortfolioHoldings(createHoldingsData(portfolio))
  }, [portfolio])

  useEffect(() => {
    if (portfolioHoldings.length < 1) return
    let value = 0
    portfolioHoldings.forEach(holding => {
      if (holding.stock === 'USD') value += holding.value
      else {
        value += (holding.quantity * holding.lastPrice)
      }
    })
    setPortfolioValue(value)
  }, [portfolioHoldings])

  return (
    <>
      <StyledDiv h='300px' spaceBetween center>
        <StyledDiv col w='85%' h='100%' justify='space-evenly'>
          {portfolioHoldings.map(holding => {
            if (holding.quantity === 0) return null
            return (
              <StyledDiv key={holding.stock} margin='0 0 4px 0'
                spaceBetween border='var(--custom-border-2)'>
                <StyledDiv txSmall>
                  {holding.stock}
                </StyledDiv>
                <StyledDiv txSmall>
                  {holding.stock === 'USD' ?
                    usdFormatter.format(holding.value) :
                    usdFormatter.format((holding.quantity * holding.lastPrice))}
                </StyledDiv>
              </StyledDiv>
            )
          })}
        </StyledDiv>
      </StyledDiv>
      <StyledDiv txSize='1.6vh' spaceBetween>
        <StyledDiv txSize='1.6vh'>Est. Value:</StyledDiv>
        <StyledDiv txSize='1.6vh'>{usdFormatter.format(portfolioValue)}</StyledDiv>
      </StyledDiv>
    </>
  )
}