import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledDiv, ImageDiv } from './styledComponents/misc'
import { getGeneralNews } from '../api/alphaVantage'


export default function NewsSection() {

  const apiKey = useSelector(state => state.session.apiKeys.alpha_vantage_alt)
  const [newsArticles, setNewsArticles] = useState([])
  const [numStories, setNumStories] = useState(5)
  const [startIndex, setStartIndex] = useState(0)

  useEffect(() => {
    getGeneralNews(apiKey)
      .then(data => {
        console.log(data)
        setNewsArticles(data)
      })
  }, [numStories])


  return (
    <>
      <StyledDiv justify='space-between'>
        <StyledDiv txSize='2vh' margin='0 0 3vh 0'>Market News</StyledDiv>

      </StyledDiv>
      <StyledDiv margin='0 0 8px 0' w='100%'
        align='center'>

        {newsArticles?.map(article => (
          <StyledDiv w='100%' h='8vh' justify='space-between'
            pad='1vh' margin='0 0 2vh 0'
            customBorder='border-bottom: 1px solid var(--gray-200);'
            bgColorHover='var(--gray-100);' pointer
            onClick={() => window.open(article.url, '_blank')}
            key={article.url}>
            <StyledDiv direction='column'>
              <StyledDiv pointer txSize='1.5vh'>{article.source}</StyledDiv>
              <StyledDiv pointer>{article.title}</StyledDiv>
            </StyledDiv>
            <ImageDiv pointer w='15%'
              bgImage={article.banner_image} txSize='1.5vh' />
          </StyledDiv>
        )).slice(startIndex, numStories + startIndex)}
      </StyledDiv>
    </>
  )
};