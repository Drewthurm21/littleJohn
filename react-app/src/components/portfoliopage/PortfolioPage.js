import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfoliosThunk } from '../../store/portfolios';
import { StyledDiv } from '../styledComponents/misc'
import { Container } from '../styledComponents/containers'
import PortfolioDoughnut from '../DoughnutChart';
import Sidebar from '../sidebar/'
import PortfolioDropdown from './PortfolioDropdown';

export default function PortfolioPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user);
  const portfolios = useSelector(state => state.portfolios);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  if (!currentUser) history.push('/');

  useEffect(() => {
    dispatch(getPortfoliosThunk(currentUser.id))
  }, [dispatch])

  useEffect(() => {
    if (!portfolios) return
    setSelectedPortfolio(Object.values(portfolios)[0])
  }, [portfolios])

  console.log(selectedPortfolio, ' in portfolio page')

  return (
    <Container margin='5vh 0 0 0' spaceBetween align='flex-start'>

      <Container margin='0 3% 0 5%' col>
        <StyledDiv w='100%' txLarge align='flex-start' margin='2vh'>Portfolio insights</StyledDiv>
        <StyledDiv w='100%' h='40%'>
          <StyledDiv w='50%' h='100%' pad='18px' bgColor='var(--gray-50)'>
            <StyledDiv w='100%' > yo</StyledDiv>
          </StyledDiv>
          <StyledDiv w='50%' h='100%' bgColor='var(--gray-200)'>
            {selectedPortfolio && <PortfolioDoughnut portfolio={selectedPortfolio} />}
          </StyledDiv>
        </StyledDiv>
        <StyledDiv col w='100%' h='40vh' margin='2vh 0'>
          {portfolios && Object.values(portfolios).map(portfolio => (
            <PortfolioDropdown portfolio={portfolio} setPortfolio={setSelectedPortfolio} />
          ))}
        </StyledDiv>
      </Container>

      <Sidebar watchlists={true} />
    </Container>
  )
};