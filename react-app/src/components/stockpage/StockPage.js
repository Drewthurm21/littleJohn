import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StyledDiv } from "../styledComponents/misc";
import { Container } from "../styledComponents/containers";
import { getCompanyQuoteThunk } from "../../store/stocks";
import { fetchCompanyOverview } from "../../api/alphaVantage";
import NewsSection from "../NewsSection"


export default function StockPage() {
  const dispatch = useDispatch()
  const { ticker } = useParams()

  const companyQuote = useSelector(state => state.stocks.quotes[ticker] || null)
  const apiKey = useSelector(state => state.session.apiKeys.alpha_vantage)

  const [companyProfile, setCompanyProfile] = useState(null)
  const [historicalPriceData, setHistoricalPriceData] = useState(null)


  useEffect(() => {
    if (companyQuote) return
    dispatch(getCompanyQuoteThunk(ticker, apiKey))
  }, [ticker, apiKey])

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetchCompanyOverview(ticker, apiKey)
      setCompanyProfile(res)
    }
    getProfile()
  }, [ticker, apiKey])

  useEffect(() => {
    //get historical data
  }, [ticker, apiKey])

  const printer = () => {
    console.log('companyQuote', companyQuote)
    console.log('companyProfile', companyProfile)
    console.log('historicalPriceData', historicalPriceData)
  }

  return (
    <Container margin='5vh 3vw 0 0' spaceBetween align='flex-start' onClick={printer}>
      <Container pad='0 2% 0 5%' >

        {/* main area */}
        <StyledDiv col >
          <StyledDiv h='600px' border='1px dotted black'>
            chart goes here
          </StyledDiv>

          {/* about */}
          <StyledDiv col h='350px' w='inherit'
            margin='2vh 0 2vh 0' pad='12px'
            bgColor='var(--gray-50)'>
            <StyledDiv txMedium w='100%' h='4vh' bottomBorder >About</StyledDiv>



          </StyledDiv>

          {/* news */}
          <NewsSection ticker={ticker} />
        </StyledDiv>
      </Container>

      {/* sidebar */}
      <StyledDiv w='20vw' h='100%' align='flex-start' border='1px solid red'>
        sidebar
      </StyledDiv>
    </Container >
  )
};