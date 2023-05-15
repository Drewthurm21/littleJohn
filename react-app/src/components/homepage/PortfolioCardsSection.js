import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfoliosThunk } from '../../store/portfolios';
import { Chevron, ChevronContainer, StyledDiv } from '../styledComponents/misc';
import PortfolioCard from './PortfolioCard';

export default function PortfolioCardsSection() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const portfolios = useSelector(state => state.portfolios);

  useEffect(() => {
    dispatch(getPortfoliosThunk(user.id))
  }, [dispatch, user])

  return (
    <>
      <StyledDiv w='100%' h='3vh' margin='12px 0 12px 0' align='center' spaceBetween>
        <StyledDiv margin='1vh 0' txSize='2vh'>Portfolios</StyledDiv>
        <StyledDiv center w='15%' pad='0 0 0 15px'>
          <StyledDiv w='20%'>
            <ChevronContainer color='black' h='20px' w='20px'>
              <Chevron left color='black' />
            </ChevronContainer>
          </StyledDiv>
          <StyledDiv w='20%'>
            <ChevronContainer color='black' h='20px'>
              <Chevron right color='black' />
            </ChevronContainer>
          </StyledDiv>
        </StyledDiv>
      </StyledDiv>
      <StyledDiv w='100%' noWrap spaceBetween margin='2vh'>
        {portfolios && Object.values(portfolios).map(portfolio => (
          <StyledDiv col w='32%' h='100%' spaceBetween border='var(--custom-nav-border)'
            bgColor='var(--gray-200)' txSize='1.6vh'
            pad='24px' radius='8px'
            key={`${portfolio.id} ${portfolio.name}`}>
            <StyledDiv>{portfolio.name}</StyledDiv>
            <PortfolioCard portfolio={portfolio} />
          </StyledDiv>
        ))}
      </StyledDiv>
    </>
  )
};
