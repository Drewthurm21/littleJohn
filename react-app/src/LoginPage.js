import LoginForm from './components/auth/LoginForm'
import { Container, PageContainer } from './components/styledComponents/containers'
import { ImageDiv, SpacerDiv, StyledDiv } from './components/styledComponents/misc'

export default function LoginPage() {


  return (
    <PageContainer>
      <Container justify='space-between'>
        <ImageDiv
          minW='50%'
          minH='100%'
          bgImage={loginImgSrc}
          content=''
        />

        <StyledDiv h='100%' minW='50%' direction='column'
          pad='0 0 0 60px'>
          <SpacerDiv h='25%' />
          <StyledDiv txMedium margin='0 0 8vh 0'>Log in to LittleJohn</StyledDiv>
          <LoginForm />
        </StyledDiv>
      </Container>
    </PageContainer>
  )
};

const loginImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/1e23d6b90f0d905b425ea289de345ab1.jpg'