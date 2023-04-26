import Slider from './components/Slider'
import * as sc from './components/styledComponents'

const {
  containers: { Container, PageContainer, },
  misc: { SpacerDiv, StyledDiv, StyledSpan, StyledImg },
  buttons: { CustomBtn }
} = sc

export default function SplashPage() {

  return (
    <PageContainer>
      <Container bgColor='#000' >
        <Container inner col bgColor='#000' minH='800px'>
          <StyledDiv w='80%'>
            <StyledDiv txWhite txSize='9vw' txWeight='500'>Earn</StyledDiv>
            <StyledDiv pad='0 1rem 1rem 1rem' txColor='#ffc757' txSize='9vw' txWeight='500'>4.4%</StyledDiv>
            <StyledDiv txWhite txSize='9vw' txWeight='500'>APY</StyledDiv>
            <StyledDiv txWhite txSize='8vw'>On your cash!</StyledDiv>
          </StyledDiv>
          <StyledDiv txWhite margin='3rem 0 0 0' maxW='70%' txSize='1.5vw' >
            Earn more than ever on your uninvested cash, FDIC-insured up to $1.5 million*. Your first 30 days are free, then it’s just $5 a month.
          </StyledDiv>
          <SpacerDiv h='2em' />
          <CustomBtn rounded border='1px solid white' w='70px' h='45px' minW='170px' bgColor='#ffc757'>Get Started</CustomBtn>
          <SpacerDiv h='2em' />
          <StyledSpan selfBottom txSmall txColor='gray' >*Terms apply. Rates subject to change</StyledSpan>
        </Container>
      </Container>

      <SpacerDiv h='2em' bgImage={greenGradient} />

      <Container col bgColor='#f0ebe6' minH='800px'>
        <Slider />
      </Container>


      <Container bgColor='var(--bright-green)' minH='800px'>
        <Container inner justify='space-between'>
          <StyledImg src={phoneImgSrc} alt='phone' margin='0 5rem 0 0' />
          <Container col align='flex-start'>
            <StyledDiv txSize='4vw' txColor='#36d136'>Investing</StyledDiv>
            <StyledDiv txLarge>Build your</StyledDiv>
            <StyledDiv txLarge>portfolio starting</StyledDiv>
            <StyledDiv txLarge>with just $1</StyledDiv>
            <SpacerDiv h='2em' />
            <StyledDiv txMedium>Invest in stocks, options, and ETFs at your pace</StyledDiv>
            <StyledDiv txMedium>and commission-free.</StyledDiv>
          </Container>
        </Container>
      </Container>

      <Container bgColor='var(--indigo-900)' minH='800px'>
        <Container inner>
          <StyledImg src={cryptoImgSrc} alt='crypto' margin='0 5rem 0 0' />
          <Container col align='flex-start'>
            <StyledDiv txColor='#ff5a87' txSize='3em'>Crypto</StyledDiv>
            <StyledDiv txLarge txWhite >Dive right in</StyledDiv>
            <StyledDiv txLarge txWhite >without the</StyledDiv>
            <StyledDiv txLarge txWhite >commission fees
            </StyledDiv>
            <SpacerDiv h='2em' />
            <StyledDiv txMedium txWhite>Other crypto exchanges charge up to 4% just to</StyledDiv>
            <StyledDiv txMedium txWhite>buy and sell crypto. We charge 0%. Get BTC,</StyledDiv>
            <StyledDiv txMedium txWhite>ETH, LTC, DOGE, and more with as little as $1.</StyledDiv>
            <SpacerDiv h='2em' />
            <CustomBtn rounded border='1px solid white' txColor='white' bgColor='transparent'>Learn more</CustomBtn>
          </Container>
        </Container>
      </Container>

      <Container bgColor='#002411'>
        <Container inner col>
          <Container>
            <StyledImg src={clockImgSrc} alt='clock' margin='0 5rem 0 0' />
            <Container col align='flex-start'>
              <StyledDiv txColor='var(--bright-green)' txSize='3em'>Retirement</StyledDiv>
              <StyledDiv txLarge txWhite >The only IRA with</StyledDiv>
              <StyledDiv txLarge txWhite >a match.</StyledDiv>
              <SpacerDiv h='2em' />
              <StyledDiv txMedium txWhite>Introducing Robinhood Retirement– Get a 1%</StyledDiv>
              <StyledDiv txMedium txWhite>match, custom recommended portfolios, and no</StyledDiv>
              <StyledDiv txMedium txWhite>commission fees.</StyledDiv>
              <SpacerDiv h='2em' />
              <CustomBtn rounded border='1px solid white' txColor='white' bgColor='transparent'>Learn more</CustomBtn>
            </Container>
          </Container>
          <StyledSpan margin='1rem' txSmall txColor='gray' >*Terms apply. Rates subject to change</StyledSpan>
        </Container>
      </Container>

      <Container bgColor='#007ff5'>
        <Container inner col>
          <Container>
            <StyledImg src={ccImgSrc} alt='phone' margin='0 5rem 0 0' />
            <Container col align='flex-start'>
              <StyledDiv txColor='var(--bright-green)' txSize='3em'>Cash Card</StyledDiv>
              <StyledDiv txLarge txWhite >Earn weekly</StyledDiv>
              <StyledDiv txLarge txWhite >rewards as you</StyledDiv>
              <StyledDiv txLarge txWhite >spend.</StyledDiv>
              <SpacerDiv h='2em' />
              <StyledDiv txMedium txWhite>Introducing the new LittleJohn Cash Card—it's</StyledDiv>
              <StyledDiv txMedium txWhite>the debit card with weekly rewards that helps</StyledDiv>
              <StyledDiv txMedium txWhite>you invest when you spend.</StyledDiv>
              <SpacerDiv h='2em' />
              <CustomBtn rounded border='1px solid white' txColor='white' bgColor='transparent'>Learn more</CustomBtn>
            </Container>
          </Container>
          <StyledSpan txSmall margin='1rem' >The LittleJohn Cash Card and other spending products offered through Acme Inc.</StyledSpan>
        </Container>
      </Container>
    </PageContainer >
  )
};

//styles
const greenGradient = 'linear-gradient(74.84deg, rgb(0, 200, 5) 18.12%, rgb(195, 245, 60) 81.46%)'

// images
const phoneImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_invest__d3559005213c848c01f05060ac9469e0.png'
const cryptoImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_crypto__6ef026ace9c7f7cf1047e15b98117523.png'
const clockImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_retirement__5374f56dd9d539e25dca91702d2911fb.png'
const ccImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_rhy__f46716f2b0d33cb50059e1b69fd8c93a.png'
