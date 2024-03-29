import LoginForm from './LoginForm'
import { Container } from '../styledComponents/containers'
import { ImageDiv, SpacerDiv, StyledDiv } from '../styledComponents/misc'

export default function LoginPage() {


  return (
    <Container spaceBetween>
      <ImageDiv
        w='50%'
        bgImage={loginImgSrc}
        content=''
      />

      <StyledDiv w='50%' col
        pad='0 0 0 60px'>
        <SpacerDiv h='25%' />
        <StyledDiv txMedium margin='0 0 8vh 0'>Log in to LittleJohn</StyledDiv>
        <LoginForm />
      </StyledDiv>
    </Container >
  )
};

const loginImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/1e23d6b90f0d905b425ea289de345ab1.jpg'