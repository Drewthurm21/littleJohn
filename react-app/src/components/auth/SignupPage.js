import SignUpForm from "./SignUpForm";
import { Container } from "../styledComponents/containers";
import { SpacerDiv, StyledDiv, StyledImg } from "../styledComponents/misc";
const rocketsImgSrc = 'https://cdn.robinhood.com/app_assets/odyssey/rockets.png'

export default function SignupPage() {


  return (
    <Container spaceBetween>
      <StyledDiv h='100%' w='100%' pad='15% 0 0 0'
        col align='center' spaceBetween
        bgColor='#82c8d2'
      >
        <StyledDiv txXLarge >Create your login</StyledDiv>
        <StyledDiv maxW='75%' txMedium >We'll need your username, a valid email address, and a password. You'll use this login to access LittleJohn next time.</StyledDiv>
        <StyledImg w='500px' src={rocketsImgSrc} />
      </StyledDiv>
      <StyledDiv minW='50%' col
        pad='0 0 0 60px' >
        <SpacerDiv h='25%' />
        <StyledDiv txColor='black' txMedium margin='0 0 8vh 0'>Sign up with LittleJohn</StyledDiv>
        <SignUpForm />
      </StyledDiv >
    </Container >
  )

};