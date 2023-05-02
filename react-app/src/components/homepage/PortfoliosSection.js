import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfoliosThunk } from '../../store/portfolios';
import { Chevron, ChevronContainer, StyledDiv } from '../styledComponents/misc';
import { createHoldingsData, createLineItem, loadPrices } from '../../utilities';


export default function PortfoliosSection() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const portfolios = useSelector(state => state.portfolios);

  useEffect(() => {
    dispatch(getPortfoliosThunk(user.id))
  }, [user])

  return (
    <>
      <StyledDiv w='100%' h='3vh' margin='12px 0 12px 0' align='center' spaceBetween>
        <StyledDiv margin='1vh 0' txSize='2vh'>Portfolios</StyledDiv>
        <StyledDiv w='10%'  >
          <StyledDiv w='15%'>
            <ChevronContainer color='black' h='20px'>
              <Chevron left color='black' />
            </ChevronContainer>
          </StyledDiv>
          <StyledDiv w='15%'>
            <ChevronContainer color='black' h='20px'>
              <Chevron right color='black' />
            </ChevronContainer>
          </StyledDiv>
        </StyledDiv>
      </StyledDiv>
      <StyledDiv w='100%' noWrap spaceBetween margin='2vh'>
        {portfolios && Object.values(portfolios).map(portfolio => (
          <StyledDiv col w='32%' h='100%' spaceBetween border='var(--custom-nav-border)'
            bgColor='var(--gray-200)' txSize='1.6vh'
            pad='24px' radius='8px'
            key={`${portfolio.id} ${portfolio.name}`}>
            <StyledDiv>{portfolio.name}</StyledDiv>
            <PortfolioCard portfolio={portfolio} />
          </StyledDiv>
        ))}
      </StyledDiv>
    </>
  )
};


const PortfolioCard = ({ portfolio }) => {

  const [portfolioHoldings, setPortfolioHoldings] = useState([])
  const [portfolioValue, setPortfolioValue] = useState(0)

  useEffect(() => {
    if (portfolio) {
      const holdings = createHoldingsData(portfolio)
      setPortfolioHoldings(holdings)
    }
  }, [portfolio])

  useEffect(() => {
    let value = 0
    if (portfolioHoldings.length) {
      portfolioHoldings.forEach(holding => {
        if (holding.stock === 'USD') value += holding.value
        else value += holding.quantity * holding.value
      })
    }
    setPortfolioValue(value)
  }, [portfolioHoldings])

  return (
    <>
      <StyledDiv h='300px' spaceBetween center>
        <StyledDiv col w='85%' h='100%' justify='space-evenly'>
          {portfolioHoldings.map(holding => (
            <StyledDiv key={holding.stock} margin='0 0 4px 0'
              spaceBetween border='var(--custom-border-2)'>
              <StyledDiv txSmall>
                {holding.stock}
              </StyledDiv>
              <StyledDiv txSmall>
                ${holding.stock === 'USD' ? holding.value : holding.quantity * holding.value}
              </StyledDiv>
            </StyledDiv>
          ))}
        </StyledDiv>
      </StyledDiv>
      <StyledDiv txSize='1.6vh' spaceBetween>
        <StyledDiv txSize='1.6vh'>
          Est. Value:
        </StyledDiv>
        <StyledDiv txSize='1.6vh'>
          ${portfolioValue}
        </StyledDiv>
      </StyledDiv>
    </>
  )
}