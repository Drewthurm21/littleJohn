import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from '../styledComponents/containers';
import { StyledDiv } from '../styledComponents/misc';
import Sidebar from '../sidebar';
import NewsSection from '../NewsSection'
import PortfoliosSection from './PortfolioCardsSection';
import ProfileOverview from './ProfileOverview';

export default function HomePage() {
  const history = useHistory()
  const currentUser = useSelector(state => state.session.user);

  if (!currentUser) history.push('/');

  return (
    <Container margin='5vh' spaceBetween align='flex-start'>
      <Container pad='0 2% 0 5%' >

        {/* main area */}
        <StyledDiv col  >
          <StyledDiv h='600px'>
            <ProfileOverview />
          </StyledDiv>

          {/* Portfolios */}
          <StyledDiv w='inherit' margin='0 0 1vh 0'
            id='portfolios-container' bottomBorder >
            <PortfoliosSection />
          </StyledDiv>

          {/* NEWS */}
          <NewsSection ticker='general' companyName='Market' />
        </StyledDiv>
      </Container>

      {/* sidebar */}
      <StyledDiv h='100%' align='flex-start'>
        <Sidebar watchlists={true} tradeView={false} />
      </StyledDiv>
    </Container >
  )
};
