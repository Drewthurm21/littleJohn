import styled from 'styled-components';
import * as sc from './styledComponents/'
const {
  containers: { Container, PageContainer, },
  misc: { SpacerDiv, StyledDiv, StyledSpan }
} = sc

const imgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_invest__d3559005213c848c01f05060ac9469e0.png'
const PhoneImg = styled.div`
  width: 100%;
  height: 100%;
`;

export default function SplashPage() {

  return (
    <PageContainer>
      <SpacerDiv h='20em' />
      <Container minH='30vw' bgColor='#000'>
        <Container inner col bgColor='#000'>
          <StyledDiv txColor='white' txSize='5em' marginY='20px'>EARN <StyledSpan txColor='gold'>4.4%</StyledSpan> on your investments</StyledDiv>
        </Container>
      </Container>

      <Container bgColor='#c3f53c'>
        <Container inner>
          <PhoneImg >
            <img src={imgSrc} alt="phone" />
          </PhoneImg>
          <Container col>
            <StyledDiv txSize='3em'>Investing</StyledDiv>
            <StyledDiv>Intuitively</StyledDiv>
          </Container>
        </Container>
      </Container>

      <Container inner>
        <PhoneImg >
          <img src={imgSrc} alt="phone" />
        </PhoneImg>
        <Container col>
          <div style={{ fontSize: '5em', }}>INVEST</div>
          <div>Intuitively</div>
        </Container>
      </Container>
    </PageContainer >
  )
};