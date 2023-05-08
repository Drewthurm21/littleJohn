import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CustomBtn } from "../styledComponents/buttons";
import { StyledDiv, StyledInput, ChevronContainer, Chevron } from "../styledComponents/misc";



export default function TradeviewSection({ companyQuote }) {
  const dispatch = useDispatch()
  const { ticker } = useParams()
  const [expanded, setExpanded] = useState(true)
  const [tradeVolume, setTradeVolume] = useState(0)
  const [orderType, setOrderType] = useState('buy')
  const [selectedPortfolio, setSelectedPortfolio] = useState(0)
  const [confirmOrder, setConfirmOrder] = useState(false)
  const portfolios = useSelector(state => state.portfolios)

  useEffect(() => {
  }, [dispatch, ticker, companyQuote, portfolios, orderType, tradeVolume, selectedPortfolio])

  const createPortfolioOptions = () => {
    return [
      <option value={0} disabled>Select a portfolio</option>,
      ...Object.values(portfolios).map(portfolio => {
        if (orderType === 'buy') {
          return <option key={portfolio.name + portfolio.id} value={portfolio.id}>{portfolio.name}</option>
        } else {
          if (portfolio.holdings[ticker]) {
            return <option key={portfolio.name + portfolio.id} value={portfolio.id}>{portfolio.name}</option>
          }
          return null
        }
      })
    ]
  };

  const determineMaxVolume = () => {
    if (selectedPortfolio === 0) return 0

    let maxVolume, holdings = portfolios[selectedPortfolio].holdings
    if (orderType === 'buy') maxVolume = Math.floor(holdings.USD / companyQuote['05. price'])
    else maxVolume = holdings[ticker] || 0
    return maxVolume
  }

  const changeOrderType = (e) => {
    setSelectedPortfolio(0)
    setTradeVolume(0)
    setOrderType(e.target.value)
  }

  const handleOrderStart = () => {
    if (selectedPortfolio === 0) return
    setConfirmOrder(true)
  }

  const handleTrade = () => {

    setConfirmOrder(true)
  }


  return (companyQuote &&
    <>
      <StyledDiv spaceBetween bottomBorder margin='0 0 1vh 0' pad='12px' >
        <StyledDiv txMedium>{`Trade ${ticker}`}</StyledDiv>
        <StyledDiv w='20px'
          justify='center' align='center'
          onClick={() => setExpanded(!expanded)}>
          <ChevronContainer hoverColor='var(--money-green)'>
            <Chevron color='black' className={expanded ? 'rotate-down' : 'rotate-up'} />
          </ChevronContainer>
        </StyledDiv>
      </StyledDiv>

      <StyledDiv id='ex-container' >
        <StyledDiv id='ex-content' className={expanded ? 'expanded' : ''} justify='center' >
          <StyledDiv spaceBetween margin='1vh 0' bottomBorder pad='8px' w='100%'>
            <StyledDiv h='30px' bold align='center'>Portfolio:</StyledDiv>
            <select w='30%' type='number' value={selectedPortfolio}
              onChange={(e) => setSelectedPortfolio(e.target.value)}>
              {portfolios && createPortfolioOptions()}
            </select>
          </StyledDiv>
          <StyledDiv spaceBetween margin='1vh 0' bottomBorder pad='8px' w='100%'>
            <StyledDiv h='30px' bold align='center'>Order Type:</StyledDiv>
            <select w='30%' type='number'
              onChange={changeOrderType}>
              <option value='buy' >Buy</option>
              <option value='sell' >Sell</option>
            </select>
          </StyledDiv>
          <StyledDiv spaceBetween margin='1vh 0' bottomBorder pad='8px' w='100%'>
            <StyledDiv h='30px' bold align='center'>Volume:</StyledDiv>
            <StyledInput w='30%' type='number' value={tradeVolume}
              min='0' max={determineMaxVolume()}
              onChange={(e) => setTradeVolume(e.target.value)} />
          </StyledDiv>

          <StyledDiv col spaceBetween margin='1vh 0' pad='8px' w='100%'>
            <StyledDiv spaceBetween>
              <StyledDiv h='30px' bold align='center'>Cash Balance:</StyledDiv>
              <StyledDiv h='30px' align='center'>${portfolios[selectedPortfolio]?.balance}</StyledDiv>
            </StyledDiv>
            <StyledDiv spaceBetween bottomBorder>
              <StyledDiv h='30px' bold align='center'>Estimated Cost:</StyledDiv>
              <StyledDiv h='30px' align='center'>${(tradeVolume * +companyQuote['05. price']).toFixed(2)}</StyledDiv>
            </StyledDiv>
            <StyledDiv spaceBetween pad='12px 0 0 0'>
              <StyledDiv h='30px' bold align='center'>Final:</StyledDiv>
              <StyledDiv h='30px' align='center'>{selectedPortfolio > 1 ?
                `$${(portfolios[selectedPortfolio]?.balance - (tradeVolume * +companyQuote['05. price'])).toFixed(2)}` :
                'No portfolio selected'}
              </StyledDiv>
            </StyledDiv>
          </StyledDiv>


          {!confirmOrder &&
            <CustomBtn rounded txColor='white' bgColor='black'
              disabled={!selectedPortfolio || !tradeVolume}
              onClick={handleOrderStart}>Finish Transaction</CustomBtn>
          }
          {confirmOrder &&
            <StyledDiv w='100%' spaceEvenly >
              <CustomBtn rounded w='40%' minW='20px'
                txColor='white' bgColor='black'
                bgColorHover='var(--money-green)' txColorHover='black'
                onClick={handleTrade}>Confirm</CustomBtn>
              <CustomBtn rounded w='40%' minW='20px'
                txColor='white' bgColor='black'
                bgColorHover='var(--red-500)' txColorHover='black'
                onClick={() => setConfirmOrder(!confirmOrder)}>Cancel</CustomBtn>
            </StyledDiv>
          }
        </StyledDiv>
      </StyledDiv>
    </>
  )
};
