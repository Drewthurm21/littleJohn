import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StyledDiv } from '../styledComponents/misc'
import { Container } from '../styledComponents/containers'
import { getPortfoliosThunk } from '../../store/portfolios';
import { usdFormatter } from '../../utilities';
import Sidebar from '../sidebar/'

export default function TradePage() {
  const dispatch = useDispatch();
  const history = useHistory()

  const currentUser = useSelector(state => state.session.user);
  const portfolios = useSelector(state => state.portfolios);
  const [allTrades, setAllTrades] = useState([])

  if (!currentUser) history.push('/');

  useEffect(() => {
    dispatch(getPortfoliosThunk(currentUser.id))
  }, [dispatch, currentUser])

  useEffect(() => {
    if (!portfolios) return

    let allTrades = []
    for (let portfolio of Object.values(portfolios)) {
      allTrades.push(...Object.values(portfolio.trades))
    }

    for (let trade of allTrades) trade.timestamp = new Date(trade.timestamp)
    allTrades.sort((a, b) => b.timestamp - a.timestamp)
    setAllTrades(allTrades)
  }, [portfolios])

  console.log(allTrades)

  return (
    <Container margin='5vh 3vw 0 0' spaceBetween align='flex-start'>

      <Container col pad='0 10% 0 25%' align='flex-start'>
        <StyledDiv w='100%' h='25vh'>
          Header
        </StyledDiv>
        <StyledDiv col w='100%' >
          {allTrades.map(trade => {
            return (
              <StyledDiv col h='55px' spaceEvenly bottomBorder margin='1vh 0'>
                <StyledDiv spaceBetween key={trade.id} >
                  <StyledDiv bold txMedium>{`${trade.ticker} ${trade.trade_type}`}</StyledDiv>
                  <StyledDiv bold txMedium>{`${usdFormatter.format(trade.quantity * trade.price)}`}</StyledDiv>
                </StyledDiv>
                <StyledDiv spaceBetween>
                  <StyledDiv key={trade.id}>{trade.timestamp.toLocaleDateString()}</StyledDiv>
                  <StyledDiv key={trade.id}>{`${trade.quantity} shares at ${usdFormatter.format(trade.price)}`}</StyledDiv>
                </StyledDiv>
              </StyledDiv>
            )
          })
          }
        </StyledDiv>
      </Container>

      <Sidebar watchlists={true} />
    </Container>
  )
};