import { useDispatch, useSelector } from 'react-redux';
import { Sparkline } from "@progress/kendo-react-charts";
import { Container } from './styledComponents/containers'
import { StyledDiv, StyledSpan } from './styledComponents/misc'
import { PlusBtn } from './styledComponents/buttons'
import ChartContainer from './charts/LineChart'


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

          <StyledDiv>MAIN AREA</StyledDiv>
          {/* NEWS */}
          <StyledDiv>
            NEWS
          </StyledDiv>
        </StyledDiv>
      </Container>


      {/* sidebar */}
      <StyledDiv position='sticky' w='20vw' h='100%' direction='column'
        margin='0 2vw 0 0' pad='8px'
        border='1px solid var(--gray-200)' >
        <StyledDiv justify='space-between' align='center'
          txSize='18px' txWeight='bold'
          customBorder='border-bottom: 1px solid var(--gray-200);'
        >
          <StyledSpan>Lists</StyledSpan>
          <StyledDiv w='15px' h='15px'>
            <PlusBtn />
          </StyledDiv>
        </StyledDiv>

        <StyledDiv>

        </StyledDiv>
        <StyledDiv direction='column'>
          {user && Object.values(watchlists).map(list => (
            <StyledDiv key={list.id} align='center' w='100%'>
              <StyledDiv>{list.name}
                {list.items.map(stock => (
                  <StyledDiv key={stock.id}
                    h='3.5vh' w='100%'
                    justify='space-between' align='center'
                  >
                    <StyledDiv>{stock}</StyledDiv>
                    <Sparkline
                      type='area' data={testData.dataPoints}
                      style={{ color: 'green' }} >
                    </Sparkline>

                  </StyledDiv>
                ))}
              </StyledDiv>
            </StyledDiv>
          ))}
        </StyledDiv>


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