import styled, { css } from "styled-components";



export const AppGridContainer = styled.div`
  display: grid;
  height: 100%;
  min-height: 100vh;
  color: white;
  grid-template-rows: 4rem 1fr 20px;
  grid-template-areas:
      "nav nav nav nav"
      "main main main main"
      "footer footer footer footer";
  text-align: center;
  grid-gap: 0.25rem;
`;

export const AppInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  grid-area: main;
`;

export const PageContainer = styled(AppInnerContainer)`
  width: 100%;
  height:100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'center'};

  height: ${({ h }) => h || '100%'};
  width: ${({ w }) => w || '100%'};
  max-height: ${({ maxH }) => maxH || ''};
  max-width: ${({ maxW }) => maxW || ''};
  min-height: ${({ minH }) => minH || ''};
  min-width: ${({ minW }) => minW || ''};

  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border: ${({ border }) => border || 'none'};

  overflow-y: ${({ overflowY }) => overflowY || 'hidden'};
  overflow-x: ${({ overflowX }) => overflowX || 'hidden'};


  ${({ inner }) => inner && `
  padding: 0 10% 0 10%;
  max-width: 2000px;
  `}

  ${({ rounded }) => rounded && `
  border-radius: 24px;
  `}

  ${({ col }) => col && `flex-direction: column;`}
  
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 10% 0 10%;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 4px 8px 32px 5px rgba( 0, 0, 0, 0.37 );
  backdrop-filter: blur( 8px );
  -webkit-backdrop-filter: blur( 5px );
  border-bottom: 4px solid rgba( 220,220,220 0.35 );
  grid-area: nav;
  z-index: 10;
  `;

export const NavBtnContainer = styled(Container)`
  overflow: hidden;
  justify-content: space-evenly;
  max-width: 1000px;
  width: 33%;
`;


export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols || 1}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows || 1}, 1fr);
  grid-gap: ${({ gap }) => gap || '0'};
  grid-template-areas: ${({ areas }) => areas || 'none'};
  
  height: ${({ h }) => h || '100%'};
  width: ${({ w }) => w || '100%'};
  max-height: ${({ maxH }) => maxH || ''};
  max-width: ${({ maxW }) => maxW || ''};
  min-height: ${({ minH }) => minH || ''};
  min-width: ${({ minW }) => minW || ''};

  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};

  ${({ grid2x2 }) => grid2x2 && (`
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    "${grid2x2}1 ${grid2x2}2"
    "${grid2x2}3 ${grid2x2}4";
  `)}
`;

export const SplashContainer = styled(Container)`
  @media screen and (min-width: 420px) and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;