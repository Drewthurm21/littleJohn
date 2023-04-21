import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavContainer = styled(FlexContainer)`
  height: 4rem;
  width: 100%;
  padding: 0 10% 0 10%;
  justify-content: space-between;
  position: sticky;
  top: 0;
  `;

export const NavBtns = styled(FlexContainer)`
  max-width: 1000px;
  width: 33%;
  height: 100%;
`;