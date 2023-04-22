import styled from "styled-components";
const littleJohnLogo = require('../../assets/littleJohnBanner.png');

export const StyledDiv = styled.div`
  /* Layout */
  display: ${({ display }) => display || 'flex'};
  flex-wrap: ${({ wrap }) => wrap || 'wrap'};
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'center'};
  
  /* Positioning */
  position: ${({ position }) => position || ''};
  top: ${({ top }) => top || ''};
  left: ${({ left }) => left || ''};
  right: ${({ right }) => right || ''};
  bottom: ${({ bottom }) => bottom || ''};
  
  /* Size & Space */
  width: ${({ w }) => w || ''};
  height: ${({ h }) => h || ''};
  min-height: ${({ mh }) => mh || ''};
  min-width: ${({ mw }) => mw || ''};
  margin: ${({ m }) => m || '0'};
  padding: ${({ p }) => p || '0'};
  ${({ marginY }) => marginY && `margin: ${marginY} 0 ${marginY} 0`};
  ${({ marginX }) => marginX && `margin: 0 ${marginX} 0 ${marginX}`};
  ${({ padY }) => padY && `padding: ${padY} 0 ${padY} 0`};
  ${({ padX }) => padX && `padding: 0 ${padX} 0 ${padX}`};

  /* Text */
  font-size: ${({ txSize }) => txSize || '1em'};
  font-weight: ${({ txWeight }) => txWeight || 'normal'};
  font-family: ${({ txFont }) => txFont || 'inherit'};
  text-align: ${({ txAlign }) => txAlign || 'left'};
  text-decoration: ${({ txDecoration }) => txDecoration || 'none'};

  /* Colors & Border */
  color: ${({ txColor }) => txColor || '#fff'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ radius }) => radius || '0'};
  box-shadow: ${({ shadow }) => shadow || 'none'};
  
  /* Misc */
  overflow: ${({ overflow }) => overflow || 'hidden'};
  transition: ${({ transition }) => transition || 'none'};
  background-image: ${({ bgImage }) => bgImage || 'none'};
  cursor: ${({ cursor }) => cursor || 'default'};
  content: ${({ content }) => content || 'none'};

  &:hover {
    background-color: ${({ bgColorHover }) => bgColorHover || 'transparent'};
    box-shadow: ${({ shadowHover }) => shadowHover || 'none'};
    transform: ${({ transformHover }) => transformHover || 'none'};
    transition: ${({ transitionHover }) => transitionHover || 'all 0.3s ease-in-out'};
  }
`;

export const StyledSpan = styled.span`
  /* Text */
  font-size: ${({ txSize }) => txSize || '1em'};
  font-weight: ${({ txWeight }) => txWeight || 'normal'};
  font-family: ${({ txFont }) => txFont || 'inherit'};
  text-decoration: ${({ txDeco }) => txDeco || 'none'};

  /* Colors & Border */
  color: ${({ txColor }) => txColor || 'black'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ radius }) => radius || '0'};
  box-shadow: ${({ shadow }) => shadow || 'none'};

  /* Misc */
  overflow: ${({ overflow }) => overflow || 'hidden'};
  transition: ${({ transition }) => transition || 'none'};
  cursor: ${({ cursor }) => cursor || 'default'};
  content: ${({ content }) => content || 'none'};

  &:hover {
    background-color: ${({ bgColorHover }) => bgColorHover || 'transparent'};
    box-shadow: ${({ shadowHover }) => shadowHover || 'none'};
    transform: ${({ transformHover }) => transformHover || 'none'};
    transition: ${({ transitionHover }) => transitionHover || 'all 0.3s ease-in-out'};
  }
`;

export const CrossBar = styled.div`
  min-height: 2em;
  width: 100%;
  background-color: ${({ bgColor }) => bgColor || `var(--green-ljt)`};
  position: relative;
  padding-bottom: 2px;
  transition: all 0.3s ease-in-out;
`;

export const BannerImg = styled.div`
  width: 15em;
  height: 2.5em;
  background-image: url(${littleJohnLogo});
  background-size: cover;
  left: 0;
  border: none;
`;

export const GlassDiv = styled.div`
  content: '';
  min-height: 2.5em;
  position: absolute;
  top: ${({ top }) => top || '0'};
  width: 100%;
  /* background: linear-gradient()(transparent 20%, transparent 30%, black); */
  backdrop-filter: blur(${({ blur }) => blur || '5px'});
  -webkit-backdrop-filter:${({ blur }) => `blur(${blur})` || 'blur( 1px )'};
  -webkit-mask-image: linear-gradient(to bottom,black 10%,transparent 80%);
  mask-image: linear-gradient(to bottom,black 10%,transparent 80%);
`;

export const SpacerDiv = styled.div`
  content: 'none';
  color: white;
  min-height: ${({ h }) => h || '1em'};
  min-width: ${({ w }) => w || '100%'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
`;