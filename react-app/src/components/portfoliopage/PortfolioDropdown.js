import { useEffect, useState } from "react";
import { StyledDiv, ChevronContainer, Chevron } from "../styledComponents/misc.js";
import { createHoldingsData } from '../../utilities.js';

export default function PortfolioDropdown({ portfolio, setPortfolio }) {

  const [expanded, setExpanded] = useState(true);
  const [portfolioHoldings, setPortfolioHoldings] = useState([]);

  useEffect(() => {
    let holdings = createHoldingsData(portfolio);
    console.log(holdings)
    setPortfolioHoldings(holdings)
  }, [portfolio])

  return (
    <StyledDiv key={portfolio.id} w='100%' h='100px' margin='1vh 0' bottomBorder onClick={() => setPortfolio(portfolio)}>
      <StyledDiv w='100%' h='100%' pad='18px' bgColor='var(--gray-50)'>
        <StyledDiv w='100%' > {portfolio.name}</StyledDiv>
      </StyledDiv>
      <StyledDiv w='20px'
        justify='center' align='center'
        onClick={() => setExpanded(!expanded)}>
        <ChevronContainer hoverColor='var(--money-green)'>
          <Chevron color='black' className={expanded ? 'rotate-down' : 'rotate-up'} />
        </ChevronContainer>
      </StyledDiv>
      <StyledDiv id='ex-container'>
        <StyledDiv id='ex-content' className={expanded ? 'expanded' : ''}>
          {portfolioHoldings && portfolioHoldings.map(holding => (
            <StyledDiv key={holding.stock} w='100%' h='100%' pad='18px' bgColor='var(--gray-50)'>
              <StyledDiv w='100%' > {holding.stock}</StyledDiv>
            </StyledDiv>
          ))}
        </StyledDiv>
      </StyledDiv>
    </StyledDiv>
  )

}
