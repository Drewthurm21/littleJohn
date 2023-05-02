import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../styledComponents/containers';
import { StyledDiv } from '../styledComponents/misc';
import ChartContainer from './LineChart';
import Sidebar from '../sidebar/Sidebar';
import NewsSection from '../NewsSection'

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);


  return (
    <Container margin='5vh' spaceBetween align='flex-start'>
      <Container inner >

        {/* main area */}
        <StyledDiv w='100%' col  >
          <StyledDiv h='500px'>
            <ChartContainer data={testData} />
          </StyledDiv>

          {/* Portfolios */}
          <StyledDiv h='30vh'>
            PORTFOLIOS
          </StyledDiv>

          {/* NEWS */}
          <NewsSection />
        </StyledDiv>
      </Container>

      {/* sidebar */}
      <StyledDiv h='100%' position='sticky' align='flex-start'>
        <Sidebar />
      </StyledDiv>
    </Container >
  )
};

const testData = {
  title: 'Buying power',
  labelsX: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  labelsY: [0, 5],
  dataPoints: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0]
}