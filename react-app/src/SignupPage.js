import SignUpForm from "./components/auth/SignUpForm";
import { Container, PageContainer } from "./components/styledComponents/containers";
import { ImageDiv, SpacerDiv, StyledDiv, StyledImg } from "./components/styledComponents/misc";
const rocketsImgSrc = 'https://cdn.robinhood.com/app_assets/odyssey/rockets.png'

export default function SignupPage() {


  return (
    <PageContainer>
      <Container justify='space-between'>
        <StyledDiv h='100%' w='100%' pad='15% 0 0 0'
          direction='column' align='center' justify='space-between'
          bgColor='#82c8d2'
        >
          <StyledDiv txXLarge >Create your login</StyledDiv>
          <StyledDiv maxW='75%' txMedium >We'll need your username, a valid email address, and a password. You'll use this login to access LittleJohn next time.</StyledDiv>
          <StyledImg w='500px' h='520px' src={rocketsImgSrc} />
        </StyledDiv>
        <StyledDiv h='100%' minW='50%' direction='column'
          pad='0 0 0 60px'>
          <SpacerDiv h='25%' />
          <StyledDiv txColor='black' txMedium margin='0 0 8vh 0'>Sign up with LittleJohn</StyledDiv>
          <SignUpForm />
        </StyledDiv>
      </Container>
    </PageContainer>
  )

};