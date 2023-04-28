import { useHistory } from 'react-router-dom';
import { Container } from './styledComponents/containers';
import { ImageDiv, StyledDiv } from './styledComponents/misc';
import { CustomBtn } from './styledComponents/buttons';

const animationSrc = 'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif';

export default function MissingPage() {
  const history = useHistory();

  const goToHome = () => history.push('/');

  return (
    <Container col h='90vh'>
      <StyledDiv h='500px' w='45vw'>
        <StyledDiv position='absolute' right='47%' txXLarge className="text-center ">404</StyledDiv>
        <StyledDiv position='absolute' top='15%' right='40%' txSize='18px' className="text-center ">The page you're looking for is not available.</StyledDiv>
        <ImageDiv h='100%' w='100%' bgImage={animationSrc} class="four_zero_four_bg">
        </ImageDiv>
      </StyledDiv>

      <StyledDiv direction='column' align='center'>
        <StyledDiv fontFamily='Arvo' txSize='40px' margin='0 0 1vh 0'>Uh oh, looks like it broke...</StyledDiv>
        <StyledDiv txSize='24px'>We'll fix it - Just one second!</StyledDiv>
        <CustomBtn rounded w='15vw' margin='2vh 0' txColor='white' bgColor='black' onClick={goToHome}>Head back home...</CustomBtn>
      </StyledDiv>
    </Container>
  )
};