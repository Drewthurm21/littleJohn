import { useEffect, useState } from "react";
import { StyledDiv, StyledSpan, ChevronContainer, Chevron } from "../styledComponents/misc.js";
import { createHoldingsData, usdFormatter } from '../../utilities.js';

export default function PortfolioDropdown({ portfolio, setPortfolio }) {

  const [expanded, setExpanded] = useState(false);
  const [portfolioHoldings, setPortfolioHoldings] = useState([]);

  useEffect(() => {
    let holdings = createHoldingsData(portfolio);
    console.log(holdings)
    setPortfolioHoldings(holdings)
  }, [portfolio])

  const openPortfolio = () => {
    if (!expanded) {
      setPortfolio(portfolio)
      setExpanded(true)
    }
    else setExpanded(false)
  }



  return (
    <>
      <StyledDiv w='100%' margin='1vh 0' bottomBorder onClick={openPortfolio}>
        <StyledDiv w='100%' h='100%' pad='18px' bgColor='var(--gray-50)'>
          <StyledDiv w='100%' > {portfolio.name}</StyledDiv>
        </StyledDiv>
        <StyledDiv w='20px' justify='center' align='center' onClick={() => setExpanded(!expanded)}>
          <ChevronContainer hoverColor='var(--money-green)'>
            <Chevron color='black' className={expanded ? 'rotate-down' : 'rotate-up'} />
          </ChevronContainer>
        </StyledDiv>
      </StyledDiv>
      <StyledDiv id='ex-container' w='100%' >
        <StyledDiv id='ex-content' className={expanded ? 'expanded' : ''}>
          {portfolioHoldings && portfolioHoldings.map(holding => {
            if (holding.stock === 'USD' || holding.quantity < 0.1) return null;
            return (
              <StyledDiv key={holding.stock} pad='18px' bgColor='var(--gray-50)'>
                <StyledDiv>{`${holding.quantity.toFixed(2)} shares of `} <StyledSpan bold margin='0 4px'>{holding.stock}</StyledSpan> {` @ ${usdFormatter.format(holding.avgCost)}`}</StyledDiv>
              </StyledDiv>
            )
          })}
        </StyledDiv>
      </StyledDiv>
    </>
  )

}
