import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { StyledDiv, StyledImg } from './styledComponents/misc'
import { getGeneralNews } from '../api/alphaVantage'

const ljLogo = 'https://github.com/Drewthurm21/littleJohn/blob/main/react-app/src/assets/ljLogo.png?raw=true'


export default function NewsSection() {

  const apiKey = useSelector(state => state.session.apiKeys.alpha_vantage_alt)
  const [newsArticles, setNewsArticles] = useState([])
  const [numStories, setNumStories] = useState(5)
  const [startIndex, setStartIndex] = useState(0)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    getGeneralNews(apiKey)
      .then(data => {
        setNewsArticles(data)
      })
  }, [refresh])

  const changePage = (direction) => {
    //if we're going out of bounds - go back to start and refresh
    if (direction === 'next' && startIndex + numStories * 2 > 50 ||
      direction === 'prev' && startIndex - numStories < 0) {
      setRefresh(!refresh)
      setStartIndex(0)
      return
    }
    //otherwise, change the start index
    if (direction === 'next') setStartIndex(startIndex + numStories)
    else setStartIndex(startIndex - numStories)
  }



  return (
    <>
      <StyledDiv justify='space-between'>
        <StyledDiv txSize='2vh' margin='0 0 3vh 0'>Market News</StyledDiv>
        <StyledDiv w='150px' direction='column' justify='space-evenly' align='center'>
          <StyledDiv txSmall margin='0 0 10px 0'>Page size</StyledDiv>
          <StyledDiv direction='row' justify='space-between' w='100%' margin='0 0 8px 0'>
            <NewsButton onClick={() => setNumStories(5)}>5</NewsButton>
            <NewsButton onClick={() => setNumStories(10)}>10</NewsButton>
            <NewsButton onClick={() => setNumStories(25)}>25</NewsButton>
          </StyledDiv>
          <StyledDiv w='100%' direction='row' justify='space-evenly'
          >
            <NewsButton onClick={() => changePage('prev')}>{'<'}</NewsButton>
            <NewsButton onClick={() => changePage('next')}>{'>'}</NewsButton>
          </StyledDiv>
        </StyledDiv>
      </StyledDiv>
      <StyledDiv margin='0 0 8px 0' w='100%' align='center'>
        {newsArticles?.map(article => (
          <NewsArticle article={article} />
        )).slice(startIndex, numStories + startIndex)}
      </StyledDiv>
    </>
  )
};

const NewsArticle = ({ article }) => {
  return (
    <StyledDiv w='100%' h='10vh'
      pad='1vh' margin='0 0 1vh 0' justify='space-between'
      customBorder='border-bottom: 1px solid var(--gray-200);'
      bgColorHover='var(--gray-100);' pointer
      onClick={() => window.open(article.url, '_blank')}
      key={article.url}>
      <StyledDiv direction='column' w='70%'>
        <StyledDiv pointer txSize='1.5vh' >{article.source}</StyledDiv>
        <StyledDiv pointer >{article.title}</StyledDiv>
      </StyledDiv>
      <StyledImg pointer w='13%' h='100%'
        src={article.banner_image || ljLogo} alt='photo'
        border='1px solid var(--eerie-black);'
      />
    </StyledDiv>
  )
}

const NewsButton = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 45px;
  border-radius: 4px;
  background-color: var(--eerie-black);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--gray-200);
    color: var(--eerie-black);
    cursor: pointer;
  }
`