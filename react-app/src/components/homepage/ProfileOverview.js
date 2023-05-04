import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfoliosThunk } from '../../store/portfolios';
import { consolidatePortfolioHoldings, loadPrices } from '../../utilities';
import { StyledDiv, StyledSpan } from '../styledComponents/misc';
import DoughnutChart from '../DoughnutChart';

export default function ProfileOverview() {
  const dispatch = useDispatch()

  const [refresh, setRefresh] = useState(false)
  const [profileHoldings, setProfileHoldings] = useState([])
  const [currentPrices, setCurrentPrices] = useState([])
  const [holdingsValue, setHoldingsValue] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const [capitalInvested, setTotalCost] = useState(0)
  const [cashBalance, setCashBalance] = useState(0)
  const [netPerformance, setNetPerformance] = useState(0)

  const user = useSelector(state => state.session.user)
  const portfolios = useSelector(state => state.portfolios)
  const apiKey = useSelector(state => state.session.apiKeys.alpha_vantage)

  useEffect(() => {
    if (!portfolios) dispatch(getPortfoliosThunk(user.id))
  }, [user, dispatch])

  useEffect(() => {
    if (portfolios) setProfileHoldings(consolidatePortfolioHoldings(portfolios))
  }, [dispatch, portfolios])

  useEffect(() => {
    const getStockPrices = async () => {
      const tickers = profileHoldings.map(holding => holding.stock)
      let res = await loadPrices(tickers, apiKey)
      console.log('this is res in the useEffect', res)
    }

    if (profileHoldings.length) {
      //get current prices and calculate profile value
      // getStockPrices()
      console.log('this is profileHoldings', profileHoldings)
    }
  }, [profileHoldings.length])

  return (
    <StyledDiv w='100%' spaceBetween align='center' bgColor='var(--gray-50)'>
      {/* insights */}
      <StyledDiv w='40%' h='75%' center>
        <StyledDiv col h='100%'>
          <StyledDiv txSize='2.2vw' margin='2vh 0 3vh 0'>Profile Value: ${totalValue} </StyledDiv>
          {[
            ['Est. Holdings Value', holdingsValue],
            ['Cash Balance', cashBalance],
            ['break', null],
            ['Capital Invested', capitalInvested],
            ['break', null],
          ]
            .map(([label, value]) => createLineItem(label, value))}
          <StyledDiv txSize='1.6vw' margin='3vh 0 0 0'>Net total: ${netPerformance} </StyledDiv>
        </StyledDiv>
      </StyledDiv>


      {/* doughnut */}
      <StyledDiv w='60%' h='100%' bgColor='var(--gray-200)'>
        <DoughnutChart allHoldings={profileHoldings} small={false} />
      </StyledDiv>

    </StyledDiv>
  )
};

function createLineItem(label, value) {
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