import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Chevron, ChevronContainer, StyledDiv, StyledImg } from './styledComponents/misc'
import { fetchGeneralNews, fetchCompanyNews } from '../api/alphaVantage'

const ljLogo = 'https://github.com/Drewthurm21/littleJohn/blob/main/react-app/src/assets/ljLogo.png?raw=true'


export default function NewsSection({ ticker }) {
  const apiKey = useSelector(state => state.session.apiKeys.alpha_vantage)
  const [newsArticles, setNewsArticles] = useState([])
  const [pageSize, setPageSize] = useState(5)
  const [startIndex, setStartIndex] = useState(0)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (!apiKey) return
    if (ticker === 'general') {
      return fetchGeneralNews(apiKey)
        .then(data => setNewsArticles(data))
    }

    fetchCompanyNews(ticker, apiKey)
      .then(data => setNewsArticles(data))
  }, [refresh, apiKey])

  const changePage = (direction) => {
    //if we're going out of bounds - go back to start and refresh
    if (direction === 'next' && startIndex + pageSize * 2 > 50 ||
      direction === 'prev' && startIndex - pageSize < 0) {
      setRefresh(!refresh)
      setStartIndex(0)
      return
    }
    //otherwise, change the start index
    if (direction === 'next') setStartIndex(startIndex + pageSize)
    else setStartIndex(startIndex - pageSize)
  }

  const changePageSize = (size) => {
    //if increasing the page size would put us out of bounds - only show remaining stories
    if (startIndex + size > 50) setPageSize(50 - startIndex)
    else setPageSize(size)
  }

  return (
    <>
      <StyledDiv spaceBetween margin='0 0 3vh 0' pad='12px'>
        <StyledDiv txLarge h='100%' pad='30px 0 0 0'>{ticker === 'general' ? 'Market' : ticker} News</StyledDiv>
        <StyledDiv w='150px' col justify='space-evenly' align='center'>
          <StyledDiv underline txSize='1.2vh'>Page controls</StyledDiv>
          <StyledDiv spaceBetween w='100%' margin='1vh 0'>
            <NewsButton disabled={pageSize === 5} onClick={() => changePageSize(5)}>5</NewsButton>
            <NewsButton disabled={pageSize === 10} onClick={() => changePageSize(10)}>10</NewsButton>
            <NewsButton disabled={pageSize === 25} onClick={() => changePageSize(25)}>25</NewsButton>
          </StyledDiv>
          <StyledDiv w='100%' justify='space-evenly'
          >
            <NewsButton w='30px'
              disabled={startIndex - pageSize < 0}
              onClick={() => changePage('prev')}>
              <ChevronContainer>
                <Chevron left color='white' />
              </ChevronContainer>
            </NewsButton>
            <NewsButton w='30px'
              disabled={startIndex + pageSize * 2 > 50}
              onClick={() => changePage('next')}>
              <ChevronContainer>
                <Chevron right color='white' />
              </ChevronContainer>
            </NewsButton>
          </StyledDiv>
        </StyledDiv>
      </StyledDiv>
      <StyledDiv margin='0 0 8px 0' w='100%' align='center'>
        {newsArticles?.map(article => (
          <NewsArticle article={article} />
        )).slice(startIndex, pageSize + startIndex)}
      </StyledDiv>
    </>
  )
};

const NewsArticle = ({ article }) => {
  return (
    <StyledDiv w='100%' h='10vh'
      pad='1.5vh' spaceBetween bottomBorder
      bgColorHover='var(--gray-100);' pointer
      onClick={() => window.open(article.url, '_blank')}
      key={article.url}>
      <StyledDiv col w='70%'>
        <StyledDiv pointer txSize='1.5vh' underline margin='0 0 10px 0'>{article.source}</StyledDiv>
        <StyledDiv pointer >{article.title}</StyledDiv>
      </StyledDiv>
      <StyledImg pointer w='13%' h='100%'
        src={article.banner_image || ljLogo} alt='photo'
        border='1px solid var(--eerie-black);' />
    </StyledDiv>
  )
}

const NewsButton = styled.span`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ h }) => h || '25px'};
  width: ${({ w }) => w || '40px'};
  border-radius: 4px;
  background-color: var(--eerie-black);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--gray-400);
    color: var(--eerie-black);
    cursor: ${({ disabled }) => disabled ? 'mouse' : 'pointer'}
  }

  ${({ disabled }) => disabled && `
    background-color: var(--gray-400);
    color: white;
    cursor: mouse;
  `}
`