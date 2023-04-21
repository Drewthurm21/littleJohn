import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  height: 100vh;
  width: 100vw;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 100%;
  padding: 0 10% 0 10%;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background:
    linear-gradient(black,black) bottom/100% 2px no-repeat,
    white;
  border-bottom:5px solid white;
`;

export const NavBtnContainer = styled(FlexContainer)`
  justify-content: space-evenly;
  max-width: 1000px;
  width: 33%;
  height: 100%;
  box-sizing: border-box;
`;