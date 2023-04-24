import * as sc from './styledComponents/'
const {
  containers: { Container, PageContainer, },
  misc: { SpacerDiv, StyledDiv, StyledSpan, StyledImg },
  buttons: { CustomBtn }
} = sc

export default function SplashPage() {

  return (
    <PageContainer>
      <Container bgColor='#000'>
        <Container inner col bgColor='#000'>
          <StyledDiv w='80%'>
            <StyledSpan txColor='white' txSize='132px' txWeight='500'>Earn</StyledSpan>
            <StyledSpan pad='0 1rem 1rem 1rem' txColor='#ffc757' txSize='132px' txWeight='500'>4.4%</StyledSpan>
            <StyledSpan txColor='white' txSize='132px' txWeight='500'>APY</StyledSpan>
            <StyledSpan txColor='white' txSize='132px'>On your cash!</StyledSpan>
          </StyledDiv>
          <StyledDiv margin='3rem 0 0 0' maxW='70%' txColor='white' txSize='28px' >
            Earn more than ever on your uninvested cash, FDIC-insured up to $1.5 million*. Your first 30 days are free, then it’s just $5 a month.
          </StyledDiv>
          <SpacerDiv h='2em' />
          <CustomBtn rounded border='1px solid white' w='70px' h='35px' minW='170px' bgColor='#ffc757'>Get Started</CustomBtn>
          <StyledSpan selfBottom txColor='gray' txSize='12px'>*Terms apply. Rates subject to change</StyledSpan>
        </Container>
      </Container>

      <SpacerDiv h='2em' bgColor='var(--green-gradient)' />

      <Container bgColor='#c3f53c'>
        <Container inner>
          <StyledImg src={phoneImgSrc} alt='phone' />
          <Container col>
            <StyledDiv txSize='3em'>Investing</StyledDiv>
            <StyledDiv>Intuitively</StyledDiv>
          </Container>
        </Container>
      </Container>

      <Container bgColor='#c3f53c'>
        <Container inner>
          <StyledImg src={cryptoImgSrc} alt='phone' />
          <Container col>
            <StyledDiv txSize='3em'>Investing</StyledDiv>
            <StyledDiv>Intuitively</StyledDiv>
          </Container>
        </Container>
      </Container>

      <Container bgColor='#c3f53c'>
        <Container inner>
          <StyledImg src={phoneImgSrc} alt='phone' />
          <Container col>
            <StyledDiv txSize='3em'>Investing</StyledDiv>
            <StyledDiv>Intuitively</StyledDiv>
          </Container>
        </Container>
      </Container>

      <Container bgColor='#c3f53c'>
        <Container inner>
          <StyledImg src={phoneImgSrc} alt='phone' />
          <Container col>
            <StyledDiv txSize='3em'>Investing</StyledDiv>
            <StyledDiv>Intuitively</StyledDiv>
          </Container>
        </Container>
      </Container>
    </PageContainer >
  )
};

const phoneImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_invest__d3559005213c848c01f05060ac9469e0.png'
const cryptoImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_crypto__6ef026ace9c7f7cf1047e15b98117523.png'
