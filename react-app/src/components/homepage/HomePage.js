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
    <Container margin='8vh' justify='space-between' >
      <Container inner align='flex-start'>

        {/* main area */}
        <StyledDiv w='100%' direction='column' >
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
      <Sidebar />
      <StyledDiv>
      </StyledDiv>
    </Container>
  )
};

const testData = {
  title: 'Buying power',
  labelsX: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  labelsY: [0, 5],
  dataPoints: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0]
}