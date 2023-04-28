import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../styledComponents/containers';
import { StyledDiv } from '../styledComponents/misc';
import ChartContainer from './LineChart';
import Sidebar from '../Sidebar/Sidebar';


export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const { watchlists } = user;

  return (
    <Container margin='5vh' justify='space-between' >
      <Container margin='0 1vh 0 3vh' align='flex-start'>

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
          <StyledDiv>
            NEWS
          </StyledDiv>
        </StyledDiv>
      </Container>


      <Sidebar />
    </Container>
  )
};

const testData = {
  title: 'Buying power',
  labelsX: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  labelsY: [0, 5],
  dataPoints: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0]
}