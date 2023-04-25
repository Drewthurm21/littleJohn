import styled from "styled-components";

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
  min-height: ${({ minH }) => minH || ''};
  min-width: ${({ minW }) => minW || ''};
  max-height: ${({ maxH }) => maxH || ''};
  max-width: ${({ maxW }) => maxW || ''};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ pad }) => pad || '0'};
  ${({ marginY }) => marginY && `margin: ${marginY} 0 ${marginY} 0`};
  ${({ marginX }) => marginX && `margin: 0 ${marginX} 0 ${marginX}`};
  ${({ padY }) => padY && `padding: ${padY} 0 ${padY} 0`};
  ${({ padX }) => padX && `padding: 0 ${padX} 0 ${padX}`};

  /* Typography */
  font-size: ${({ txSize }) => txSize || '1em'};
  font-weight: ${({ txWeight }) => txWeight || 'normal'};
  font-family: ${({ txFont }) => txFont || 'inherit'};
  text-align: ${({ txAlign }) => txAlign || 'left'};
  text-decoration: ${({ txDeco }) => txDeco || 'none'};
  ${({ underline }) => underline && ({ textDecoration: 'underline' })}
  ${({ bold }) => bold && ({ fontWeight: 'bold' })}
  ${({ txSmall }) => txSmall && ({ fontSize: '.8vw' })}
  ${({ txMedium }) => txMedium && ({ fontSize: '1.2vw' })}
  ${({ txLarge }) => txLarge && ({ fontSize: '3vw' })}
  ${({ txXLarge }) => txXLarge && ({ fontSize: '5vw' })}

  /* Colors & Border */
  color: ${({ txColor }) => txColor || '#000'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ radius }) => radius || '0'};
  box-shadow: ${({ shadow }) => shadow || 'none'};
    ${({ txWhite }) => txWhite && ({ color: 'white' })}
  ${({ txBlack }) => txBlack && ({ color: 'black' })}
  
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
  ${({ underline }) => underline && ({ textDecoration: 'underline' })}
  ${({ txSmall }) => txSmall && ({ fontSize: '0.8em' })}
  ${({ txMedium }) => txMedium && ({ fontSize: '1.2em' })}
  ${({ txLarge }) => txLarge && ({ fontSize: '1.6em' })}
  ${({ txXLarge }) => txXLarge && ({ fontSize: '2em' })}

  /* Colors & Border */
  color: ${({ txColor }) => txColor || 'black'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ radius }) => radius || '0'};
  box-shadow: ${({ shadow }) => shadow || 'none'};
  
  /* Space */
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ pad }) => pad || '0px'};
  align-self: ${({ alignSelf }) => alignSelf || 'auto'};

  /* Size & Position */
  position: ${({ position }) => position || 'relative'};
  top: ${({ top }) => top || '0'};
  left: ${({ left }) => left || '0'};
  right: ${({ right }) => right || '0'};
  bottom: ${({ bottom }) => bottom || '0'};
  ${({ footNote }) => footNote && `
  align-self: flex-end;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 50%;
  `};

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

export const BannerImg = styled.div`
  content: '';
  width: 15em;
  height: 2.5em;
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  background-size: cover;
  left: 0;
  border: none;
`;

export const GlassBox = styled.div`
  content: '';
  height: ${({ h }) => h || '30px'};
  width: ${({ w }) => w || '30px'};
  position: ${({ position }) => position || 'relative'};
  top: ${({ top }) => top || '0'};
  left: ${({ left }) => left || '0'};
  right: ${({ right }) => right || '0'};
  bottom: ${({ bottom }) => bottom || '0'};
  z-index: ${({ zIndex }) => zIndex || ''};

  backdrop-filter: blur(${({ blur }) => blur || '8px'});
  mask-image: linear-gradient(to bottom,black 10%,transparent 80%);

  ${({ minW }) => minW && `min-width: ${minW}`};
`;

export const SpacerDiv = styled.div`
  content: 'none';
  color: white;
  min-height: ${({ h }) => h || '1em'};
  min-width: ${({ w }) => w || '100%'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  background-image: ${({ bgImage }) => bgImage || 'none'};
`;

export const StyledImg = styled.img`
  width: 100%;
  max-width: ${({ maxW }) => maxW || '100%'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ pad }) => pad || '0px'};
  object-fit: contain;
`;