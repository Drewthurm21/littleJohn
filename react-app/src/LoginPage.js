import * as sc from './components/styledComponents'
import LoginForm from './components/auth/LoginForm'
const {
  containers: { Container, PageContainer, },
  misc: { ImageDiv, StyledDiv, StyledSpan, StyledImg },
  buttons: { CustomBtn }
} = sc



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

        <StyledDiv minW='50%'>
          <LoginForm />
        </StyledDiv>
      </Container>
    </PageContainer>
  )
};

const loginImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/1e23d6b90f0d905b425ea289de345ab1.jpg'