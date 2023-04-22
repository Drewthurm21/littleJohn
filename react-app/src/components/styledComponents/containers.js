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

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ColContainer = styled(RowContainer)`
  flex-direction: column;
`;

export const PageContainer = styled(ColContainer)`
  padding: 20% 10% 0 10%;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
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
  background: rgba( 255, 255, 255, 0.2 );
  box-shadow: 0 8px 32px 5px rgba( 0, 0, 0, 0.37 );
  backdrop-filter: blur( 5px );
  -webkit-backdrop-filter: blur( 5px );
  border-bottom: 4px solid rgba( 255, 255, 255, 0.18 );
`;

export const NavBtnContainer = styled(RowContainer)`
  justify-content: space-evenly;
  max-width: 1000px;
  width: 33%;
  height: 100%;
  box-sizing: border-box;
`;