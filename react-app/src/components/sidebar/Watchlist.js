import { useState, useEffect } from 'react';
import { StyledDiv, StyledSpan } from '../styledComponents/misc';
import WatchlistItem from './WatchlistItem';
export default function Watchlist({ name, items }) {

  const [expanded, setExpanded] = useState(false)
  const [sparklines, setSparklines] = useState([])

  const sparks = items.map((ticker, i) => (
    <WatchlistItem key={i + ticker} ticker={ticker} />
  ))

  useEffect(() => {
    if (expanded) setSparklines(sparks)
    else setSparklines([])

  }, [expanded])


  return (
    <StyledDiv direction='column'>
      <StyledDiv align='center' w='100%'>

        <StyledDiv h='3vh' w='100%' margin='0 0 1vh 0'
          justify='space-between' align='center'
          customBorder='border-bottom: 1px solid var(--gray-900);'
        >
          <StyledSpan txSize='18px' txWeight='bold'>{name}</StyledSpan>
          <StyledSpan onClick={() => setExpanded(!expanded)} txSize='14px'>
            {expanded ? 'Hide' : 'Show'}
          </StyledSpan>
        </StyledDiv>

        <StyledDiv>
          {sparklines}
        </StyledDiv>
      </StyledDiv>
    </StyledDiv>
  )
}
