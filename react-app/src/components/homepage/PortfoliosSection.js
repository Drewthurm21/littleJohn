import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfoliosThunk } from '../../store/portfolios';
import { Chevron, ChevronContainer, StyledDiv } from '../styledComponents/misc';
import PortfolioDoughnut from '../DoughnutChart';


export default function PortfoliosSection() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const portfolios = useSelector(state => state.portfolios);

  useEffect(() => {
    dispatch(getPortfoliosThunk(user.id))
  }, [user])

  return (
    <>
      <StyledDiv w='100%' h='3vh' margin='12px 0 12px 0' align='center' spaceBetween>
        <StyledDiv margin='1vh 0' txSize='2vh'>Portfolios</StyledDiv>
        <StyledDiv w='40%'  >
          <StyledDiv w='15%'>
            <ChevronContainer color='black' h='20px'>
              <Chevron left color='black' />
            </ChevronContainer>
          </StyledDiv>
          <StyledDiv w='15%'>
            <ChevronContainer color='black' h='20px'>
              <Chevron right color='black' />
            </ChevronContainer>
          </StyledDiv>
        </StyledDiv>
      </StyledDiv>
      <StyledDiv noWrap>
        {portfolios && Object.values(portfolios).map(portfolio => (
          <StyledDiv
            key={`${portfolio.id} ${portfolio.name}`}>
            <StyledDiv>{portfolio.name}</StyledDiv>
            <PortfolioDoughnut portfolio={portfolio} />
          </StyledDiv>
        ))}
      </StyledDiv>
    </>
  )
};
