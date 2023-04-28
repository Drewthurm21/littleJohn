import { useHistory } from 'react-router-dom'
import Slider from './Slider'
import { splashPageData } from '../data/splashPageData'
import { Container, SplashContainer } from './styledComponents/containers'
import { SpacerDiv, StyledDiv, StyledSpan, StyledImg } from './styledComponents/misc'
import { CustomBtn } from './styledComponents/buttons'


export default function SplashPage() {
  const history = useHistory()

  const goToSignup = () => history.push('/signup')

  return (
    <Container col>
      <Container bgColor='#000' >
        <Container inner col bgColor='#000' minH='65vh'>
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
          <CustomBtn
            rounded border='1px solid white'
            w='70px' h='45px' minW='170px' bgColor='#ffc757'
            onClick={goToSignup}
          >Get Started</CustomBtn>
          <SpacerDiv h='2em' />
          <StyledSpan selfBottom txSmall txColor='gray' >*Terms apply. Rates subject to change</StyledSpan>
        </Container>
      </Container>

      <SpacerDiv h='2em' bgImage='var(--splash-gradient)' />

      <Container col bgColor='#f0ebe6' minH='65vh'>
        <Slider />
      </Container>

      {splashPageData.map((options) => splashSection(options, goToSignup))}

    </Container >
  )
};

function splashSection(options, cb) {
  const {
    heroText, mainText, subText, disclaimer,
    heroColor, textColor, bgColor,
    imgSrc, imgAlt,
    btnText
  } = options

  return (
    <Container col bgColor={bgColor} minH='65vh'>
      <SplashContainer inner >

        <StyledImg maxW='50%' src={imgSrc} alt={imgAlt} margin='0 5rem 0 0' />
        <Container col w='50%' align='flex-start'>
          <StyledDiv txSize='4vw' txColor={heroColor}>{heroText}</StyledDiv>
          {mainText.map((text) => <StyledDiv txColor={textColor} txLarge>{text}</StyledDiv>)}
          <SpacerDiv h='2em' />
          {subText.map((subtext) => <StyledDiv txColor={textColor} txMedium>{subtext}</StyledDiv>)}
          <SpacerDiv h='2em' />
          <CustomBtn
            rounded border='1px solid black'
            txColor={textColor} bgColor='transparent'
            onClick={cb}
          >{btnText}</CustomBtn>
        </Container>

      </SplashContainer>
      <StyledSpan margin='1rem' txSmall txColor={textColor} >
        {disclaimer}
      </StyledSpan>
    </Container>
  )
}
