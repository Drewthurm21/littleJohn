import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StyledDiv } from "../styledComponents/misc";
import { Container } from "../styledComponents/containers";
import { getCompanyQuote, getCompanyNews } from "../../api/alphaVantage";
import NewsSection from "../NewsSection"


export default function StockPage() {
  const { ticker } = useParams()

  const [companyQuote, setCompanyQuote] = useState(null)
  const [companyNews, setCompanyNews] = useState(null)
  const apiKey = useSelector(state => state.session.apiKeys.alpha_vantage)


  useEffect(() => {
    const getQuote = async () => {
      const res = await getCompanyQuote(ticker, apiKey)
      setCompanyQuote(res)
    }
    getQuote()
  }, [ticker, apiKey])


  return (
    <Container margin='5vh' spaceBetween align='flex-start'>
      <Container pad='0 2% 0 5%' >

        {/* main area */}
        <StyledDiv col >
          <StyledDiv h='600px' border='1px dotted black'>
            chart goes here
          </StyledDiv>

          {/* about */}
          <StyledDiv h='350px' w='inherit' margin='0 0 1vh 0' border='1px dashed green'>
            About section
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