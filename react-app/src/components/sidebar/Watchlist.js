import { useState } from 'react';
import { StyledDiv, StyledSpan, ChevronContainer, Chevron } from '../styledComponents/misc';
import WatchlistItem from './WatchlistItem';

export default function Watchlist({ name, items }) {
  const [expanded, setExpanded] = useState(false)
  const [showEditList, setShowEditList] = useState(false)

  return (
    <StyledDiv col  >
      <StyledDiv align='center'>
        <StyledDiv h='3vh' w='100%' pad='3px' margin='0 0 1vh 0'
          spaceBetween align='center' bgColorHover='var(--gray-100)'
          customBorder='border-bottom: 1px solid var(--gray-900);'>
          <StyledSpan txSize='18px' txWeight='bold'>{name}</StyledSpan>
          <StyledDiv w='30%' h='100%' spaceBetween>
            <StyledDiv w='40%' justify='center' align='center'
              radius='5px' cursor='pointer'
              bgColorHover='var(--gray-400)'
              onClick={() => setShowEditList(!showEditList)}>
              <StyledDiv bold>...</StyledDiv>
              {showEditList && (
                <StyledDiv col bgColor='var(--gray-100)'
                  position='absolute' top='100%' left='0'
                  w='100%' h='100%' pad='5px' radius='5px'
                  customBorder='border: 1px solid var(--gray-400);'>
                  <StyledDiv txColor='red'>Remove</StyledDiv>
                  <StyledDiv txColor='red'>Rename</StyledDiv>
                </StyledDiv>
              )}
            </StyledDiv>

            <StyledDiv h='100%' w='20px'
              justify='center' align='center'
              onClick={() => setExpanded(!expanded)}>
              <ChevronContainer hoverColor='var(--money-green)'>
                <Chevron color='black' className={expanded ? 'rotate-down' : 'rotate-up'} />
              </ChevronContainer>
            </StyledDiv>
          </StyledDiv>
        </StyledDiv>

        <StyledDiv id='ex-container'>
          <StyledDiv id='watchlist' className={expanded ? 'expanded' : ''}>
            {items.map((ticker, i) => (
              <WatchlistItem key={i + ticker} ticker={ticker} />
            ))}
          </StyledDiv>
        </StyledDiv>
      </StyledDiv >
    </StyledDiv >
  )
}
