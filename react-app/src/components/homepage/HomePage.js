import { Container } from '../styledComponents/containers';
import { StyledDiv } from '../styledComponents/misc';
import Sidebar from '../sidebar';
import NewsSection from '../NewsSection'
import PortfoliosSection from './PortfoliosSection';
import ProfileOverview from './ProfileOverview';

export default function HomePage() {

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
          <NewsSection ticker={'general'} />
        </StyledDiv>
      </Container>

      {/* sidebar */}
      <StyledDiv h='100%' align='flex-start'>
        <Sidebar />
      </StyledDiv>
    </Container >
  )
};
