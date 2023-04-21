import styled from 'styled-components';
import * as sc from './styledComponents/'

const { FlexContainer } = sc.containers;

const SplashContainer = styled(FlexContainer)`
  padding-top: 3em;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;


export default function SplashPage() {


  return (
    <SplashContainer>
      <h1>My Splash Page</h1>
    </SplashContainer>
  )
};