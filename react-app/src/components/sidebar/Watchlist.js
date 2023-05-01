import { useState } from 'react';
import { StyledDiv, StyledSpan, Chevron } from '../styledComponents/misc';
import WatchlistItem from './WatchlistItem';

export default function Watchlist({ name, items }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <StyledDiv direction='column'>
      <StyledDiv align='center' w='100%'>

        <StyledDiv h='3vh' w='100%' margin='0 0 1vh 0'
          justify='space-between' align='center'
          customBorder='border-bottom: 1px solid var(--gray-900);'
        >
          <StyledSpan txSize='18px' txWeight='bold'>{name}</StyledSpan>
          <StyledDiv h='100%' w='20px' margin='0 5px 0 0'
            justify='center' align='center'
            onClick={() => setExpanded(!expanded)}
          >
            <Chevron className={expanded ? 'rotate-down' : 'rotate-up'} />
          </StyledDiv>
        </StyledDiv>

        <StyledDiv id='ex-container'>
          <StyledDiv id='watchlist' className={expanded ? 'expanded' : ''}>
            {items.map((ticker, i) => (
              <WatchlistItem key={i + ticker} ticker={ticker} />
            ))}
          </StyledDiv>
        </StyledDiv>
      </StyledDiv>
    </StyledDiv>
  )
}
