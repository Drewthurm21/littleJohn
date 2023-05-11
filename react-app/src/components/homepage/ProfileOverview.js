import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfoliosThunk } from '../../store/portfolios';
import { abbreviateNumber, consolidatePortfolioHoldings, loadPrices, usdFormatter } from '../../utilities';
import { StyledDiv, StyledSpan } from '../styledComponents/misc';
import DoughnutChart from '../DoughnutChart';

export default function ProfileOverview() {
  const dispatch = useDispatch()

  const [profileHoldings, setProfileHoldings] = useState([])
  const [currentPrices, setCurrentPrices] = useState([])
  const [proflieStats, setProflieStats] = useState({})

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
      setCurrentPrices(res)
    }

    if (profileHoldings.length) {
      //get current prices and calculate profile value
      getStockPrices()
    }
  }, [profileHoldings.length])

  useEffect(() => {
    const profileTotals = {
      cashBalance: 0,
      capitalInvested: 0,
      stockValue: 0,
      totalPerformance: 0,
    }

    if (currentPrices && profileHoldings) {
      profileHoldings.forEach(holding => {
        if (holding.stock === 'USD') {
          profileTotals.cashBalance += holding.quantity
          profileTotals.capitalInvested += holding.quantity
          return
        }

        let currentPrice = currentPrices[holding.stock]
        const value = currentPrice * holding.quantity
        profileTotals.capitalInvested += holding.cost
        profileTotals.stockValue += value
        profileTotals.totalPerformance += value - holding.cost
      })
    }

    setProflieStats(profileTotals)
  }, [currentPrices.length, profileHoldings.length])

  return (
    <StyledDiv w='100%' spaceBetween align='center' bgColor='var(--gray-50)'>
      {/* insights */}
      <StyledDiv w='40%' h='75%' center>
        <StyledDiv col h='100%'>
          <StyledDiv txSize='2.2vw' margin='2vh 0 3vh 0'>Account Value: {usdFormatter.format(proflieStats?.stockValue + proflieStats?.cashBalance)} </StyledDiv>
          {[
            ['Est. Holdings Value', proflieStats?.stockValue],
            ['Cash Balance', proflieStats?.cashBalance],
            ['break', null],
            ['Capital Invested', proflieStats?.capitalInvested],
            ['break', null],
          ]
            .map(([label, value]) => createLineItem(label, value))}
          <StyledDiv w='85%' margin='0 0 1vh 0' spaceBetween>
            <StyledDiv txLarge>Net total:</StyledDiv>

            <StyledSpan txLarge txColor='black'>{usdFormatter.format(proflieStats?.totalPerformance)}</StyledSpan>

          </StyledDiv>
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

  return (
    <StyledDiv w='85%' margin='0 0 1vh 0' spaceBetween>
      <StyledDiv txMedium>{label}:</StyledDiv>
      <StyledSpan txMedium >{usdFormatter.format(value)}</StyledSpan>
    </StyledDiv>
  )
};