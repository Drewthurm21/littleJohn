import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ImageDiv, StyledDiv } from "../styledComponents/misc";
import { Container } from "../styledComponents/containers";
import { getCompanyQuoteThunk } from "../../store/stocks";
import { fetchCompanyProfile } from "../../api/finnhub";
import { fetchCompanyOverview, fetchHistoricalData } from "../../api/alphaVantage";
import { usdFormatter, abbreviateNumber } from "../../utilities";
import NewsSection from "../NewsSection"
import LineChart from "../DevExtremeLinechart";
import LineChartContainer from "../LinechartTwo";


export default function StockPage() {
  const dispatch = useDispatch()
  const { ticker } = useParams()

  const companyQuote = useSelector(state => state.stocks.quotes[ticker] || null)
  const alphaVantageKey = useSelector(state => state.session.apiKeys.alpha_vantage)
  const finnhubKey = useSelector(state => state.session.apiKeys.finnhub)
  const [refreshCount, setRefreshCount] = useState(0)
  const [companyProfile, setCompanyProfile] = useState(null)
  const [companyOverview, setCompanyOverview] = useState(null)
  const [historicalPriceData, setHistoricalPriceData] = useState(null)

  useEffect(() => {
    const getCompanyInfo = async () => {
      const profile = await fetchCompanyProfile(ticker, finnhubKey)
      const overview = await fetchCompanyOverview(ticker, alphaVantageKey)
      setCompanyProfile(profile)
      setCompanyOverview(overview)
    }
    getCompanyInfo()
  }, [ticker, alphaVantageKey, finnhubKey])

  useEffect(() => {
    const getHistoricalPriceData = async () => {
      const historicalData = await fetchHistoricalData(ticker, alphaVantageKey)

      const timestamps = Object.keys(historicalData) || []
      const data = Object.values(historicalData).map((val, idx) => (
        { time: timestamps[idx], value: Number(val["4. close"]) }
      )).reverse().splice(timestamps.length - 90) || []

      setHistoricalPriceData(data)
    }
    getHistoricalPriceData()
    setRefreshCount(refreshCount + 1)
  }, [ticker, alphaVantageKey])

  useEffect(() => {
    dispatch(getCompanyQuoteThunk(ticker, alphaVantageKey))
  }, [ticker, alphaVantageKey])


  const printer = () => {
    console.log('companyQuote', companyQuote)
    console.log('companyProfile', companyProfile)
    console.log('companyOverview', companyOverview)
    console.log('historicalPriceData', historicalPriceData)
  }

  return (
    <Container margin='5vh 3vw 0 0' spaceBetween align='flex-start' onClick={printer}>
      <Container pad='0 2% 0 5%' >

        {/* chart area */}

        <StyledDiv col >
          {historicalPriceData &&
            <StyledDiv h='600px' w='100%' border='1px dotted black'>
              <LineChartContainer ticker={ticker} priceHistory={historicalPriceData} company={companyProfile.name} />
            </StyledDiv>}

          {/* about section */}
          <StyledDiv col w='inherit' margin='2vh 0 2vh 0' pad='12px' bgColor='var(--gray-50)'>
            <StyledDiv txMedium h='4vh' margin='1vh 0' bottomBorder >About</StyledDiv>
            <StyledDiv>{companyOverview?.Description}</StyledDiv>
            <StyledDiv margin='2vh 0' pad='0 5%' spaceBetween>
              <ImageDiv bgImage={companyProfile?.logo} w='100px' h='100px' />
              <StyledDiv col spaceEvenly margin='0 1vw'>
                <StyledDiv txMedium>{companyProfile?.name}</StyledDiv>
                <StyledDiv>{companyProfile?.weburl}</StyledDiv>
                <StyledDiv>{companyProfile?.country}</StyledDiv>
              </StyledDiv>
              <StyledDiv col spaceEvenly margin='0 1vw'>
                <StyledDiv txMedium>Industry</StyledDiv>
                <StyledDiv>{companyProfile?.finnhubIndustry}</StyledDiv>
                <br />
              </StyledDiv>
              <StyledDiv col spaceEvenly margin='0 1vw'>
                <StyledDiv txMedium>Markets</StyledDiv>
                <StyledDiv>{companyProfile?.exchange}</StyledDiv>
                <StyledDiv>{""}</StyledDiv>
              </StyledDiv>
            </StyledDiv>

            {/* about section - financial overview */}
            {companyQuote && companyProfile && companyOverview &&
              <StyledDiv col w='inherit' bgColor='var(--gray-50)'>
                <StyledDiv txMedium h='2vh' margin='1vh 0' bottomBorder >Key Statistics</StyledDiv>
                <StyledDiv margin='2vh 0' pad='0 5%' spaceBetween>
                  <StyledDiv col w='18%'>
                    <StyledDiv bold>High today</StyledDiv>
                    <StyledDiv txSmall>{usdFormatter.format(companyQuote['03. high'])}</StyledDiv>
                  </StyledDiv>
                  <StyledDiv col w='18%'>
                    <StyledDiv bold>Low Today</StyledDiv>
                    <StyledDiv txSmall>{usdFormatter.format(companyQuote['04. low'])}</StyledDiv>
                  </StyledDiv>
                  <StyledDiv col w='18%'>
                    <StyledDiv bold>Open</StyledDiv>
                    <StyledDiv txSmall>{usdFormatter.format(companyQuote['02. open'])}</StyledDiv>
                  </StyledDiv>
                  <StyledDiv col w='18%'>
                    <StyledDiv bold>Volume</StyledDiv>
                    <StyledDiv txSmall>{abbreviateNumber(companyQuote['06. volume'])}</StyledDiv>
                  </StyledDiv>
                  <StyledDiv col w='18%'>
                    <StyledDiv bold>52 Week high</StyledDiv>
                    <StyledDiv txSmall>{companyOverview["52WeekHigh"]}</StyledDiv>
                  </StyledDiv>
                </StyledDiv>
                <StyledDiv margin='2vh 0' pad='0 5%' spaceBetween>
                  <StyledDiv col w='18%'>
                    <StyledDiv bold >Market Cap.</StyledDiv>
                    <StyledDiv txSmall>{abbreviateNumber(companyOverview.MarketCapitalization)}</StyledDiv>
                  </StyledDiv>
                  <StyledDiv col w='18%'>
                    <StyledDiv bold >Div. Yeild</StyledDiv>
                    <StyledDiv txSmall>{(+companyOverview.DividendYield * 100)} %</StyledDiv>
                  </StyledDiv>
                  <StyledDiv col w='18%'>
                    <StyledDiv bold>P/E Ratio</StyledDiv>
                    <StyledDiv txSmall>{companyOverview.PERatio}</StyledDiv>
                  </StyledDiv>
                  <StyledDiv col w='18%'>
                    <StyledDiv bold>P/B Ratio</StyledDiv>
                    <StyledDiv txSmall>{companyOverview.PriceToBookRatio}</StyledDiv>
                  </StyledDiv>
                  <StyledDiv col w='18%'>
                    <StyledDiv bold>52 Week Low</StyledDiv>
                    <StyledDiv txSmall>{companyOverview["52WeekLow"]}</StyledDiv>
                  </StyledDiv>
                </StyledDiv>
              </StyledDiv>
            }
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