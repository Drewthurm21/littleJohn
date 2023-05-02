import styled from "styled-components";

export const StyledDiv = styled.div`
  /* Layout */
  display: ${({ display }) => display || 'flex'};
  flex-wrap: ${({ wrap }) => wrap || 'wrap'};
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || ''};
  align-items: ${({ align }) => align || ''};
  ${({ col }) => col && ({ flexDirection: 'column' })};
  ${({ gridArea }) => `grid-area: ${gridArea};` || ''};
  ${({ spaceBetween }) => spaceBetween && ({ justifyContent: 'space-between' })}
  ${({ center }) => center && ({ justifyContent: 'center', alignItems: 'center' })};
  ${({ noWrap }) => noWrap && ({ flexWrap: 'nowrap' })};
  /* Positioning */
  position: ${({ position }) => position || ''};
  top: ${({ top }) => top || ''};
  left: ${({ left }) => left || ''};
  right: ${({ right }) => right || ''};
  bottom: ${({ bottom }) => bottom || ''};
  ${({ z }) => z && ({ zIndex: z })}
  
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
  ${({ underline }) => underline && ({ textDecoration: 'underline' })};
  ${({ bold }) => bold && ({ fontWeight: 'bold' })};
  ${({ txSmall }) => txSmall && ({ fontSize: '.8vw' })};
  ${({ txMedium }) => txMedium && ({ fontSize: '1.2vw' })};
  ${({ txLarge }) => txLarge && ({ fontSize: '3vw' })};
  ${({ txXLarge }) => txXLarge && ({ fontSize: '5vw' })};

  /* Colors & Border */
  color: ${({ txColor }) => txColor || '#000'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ radius }) => radius || '0'};
  box-shadow: ${({ shadow }) => shadow || 'none'};
  ${({ txWhite }) => txWhite && ({ color: 'white' })};
  ${({ txBlack }) => txBlack && ({ color: 'black' })};
  ${({ customBorder }) => customBorder && `${customBorder}`};
  
  /* Misc */
  overflow: ${({ overflow }) => overflow || 'hidden'};
  transition: ${({ transition }) => transition || 'all 0.4s ease-in-out'};
  background-image: ${({ bgImage }) => bgImage || 'none'};
  content: ${({ content }) => content || 'none'};
  cursor: ${({ cursor }) => cursor || 'default'};
  ${({ pointer }) => pointer && ({ cursor: 'pointer' })};

  &:hover {
    color: ${({ txColorHover }) => txColorHover || ''};
    background-color: ${({ bgColorHover }) => bgColorHover || ''};
    box-shadow: ${({ shadowHover }) => shadowHover || ''};
    transform: ${({ transformHover }) => transformHover || ''};
    transition: ${({ transitionHover }) => transitionHover || 'all 0.4s ease-in-out'};
  }

  ${({ translate }) => translate && `
    position: absolute;
    transform: translate(${translate});
  `};
  
`;

export const StyledSpan = styled.span`
  /* Text */
  font-size: ${({ txSize }) => txSize || '1em'};
  font-weight: ${({ txWeight }) => txWeight || 'normal'};
  font-family: ${({ txFont }) => txFont || 'inherit'};
  text-decoration: ${({ txDeco }) => txDeco || 'none'};
  ${({ underline }) => underline && ({ textDecoration: 'underline' })};
  ${({ txSmall }) => txSmall && ({ fontSize: '0.8em' })};
  ${({ txMedium }) => txMedium && ({ fontSize: '1.2em' })};
  ${({ txLarge }) => txLarge && ({ fontSize: '1.6em' })};
  ${({ txXLarge }) => txXLarge && ({ fontSize: '2em' })};

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

export const ImageDiv = styled.div`
  content: '';
  width: ${({ w }) => w || '100%'};
  height: ${({ h }) => h || '100%'};
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
  z-index: ${({ zIndex }) => zIndex || '9'};

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
  width: ${({ w }) => w || '100%'};
  height: ${({ h }) => h || ''};
  max-width: ${({ maxW }) => maxW || '100%'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ pad }) => pad || '0px'};
  object-fit: cover;
  cursor: ${({ cursor }) => cursor || 'default'};
  border-radius: ${({ radius }) => radius || '0'};
  border: ${({ border }) => border || 'none'};

  @media only screen and (max-width: 768px) {
    width: 50%;
    max-width: 70%;
    
  }
`;

export const StyledInput = styled.input`
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

  /* Space */
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ pad }) => pad || '0 0 0 1vw'};
  align-self: ${({ alignSelf }) => alignSelf || 'auto'};
  width: ${({ w }) => w || '100%'};
  height: ${({ h }) => h || '100%'};
  ${({ minH }) => minH && `min-height: ${minH}`};

  /* Size & Position */
  position: ${({ position }) => position || 'relative'};
  top: ${({ top }) => top || '0'};
  left: ${({ left }) => left || '0'};
  right: ${({ right }) => right || '0'};
  bottom: ${({ bottom }) => bottom || '0'};
  
  /* Misc */
  overflow: ${({ overflow }) => overflow || 'hidden'};
  transition: ${({ transition }) => transition || 'none'};
  cursor: ${({ cursor }) => cursor || 'default'};
  content: ${({ content }) => content || 'none'};
  
  &:hover {
    border: ${({ borderHover }) => borderHover || 'none'};
    background-color: ${({ bgColorHover }) => bgColorHover || 'transparent'};
    box-shadow: ${({ shadowHover }) => shadowHover || 'none'};
    transform: ${({ transformHover }) => transformHover || 'none'};
    transition: ${({ transitionHover }) => transitionHover || 'all 0.3s ease-in-out'};
  }

  &:focus {
    outline: none;
    border: ${({ borderFocus }) => borderFocus || 'none'};
    color: ${({ txColorFocus }) => txColorFocus || 'black'};

  }

  ::placeholder,
  ::-webkit-input-placeholder,
  ::-moz-placeholder {
    color: ${({ placeholderColor }) => placeholderColor || 'black'};
    opacity: ${({ placeholderOpacity }) => placeholderOpacity || '1'};
    font-size: ${({ phSize }) => phSize || '0.5em'};
  }

  :valid {
    border: ${({ borderValid }) => borderValid || '1px solid black'};
  }

`;

export const Checkmark = styled.span`
    margin: 8px;
    color: green;
    font-size: 24px;
`;

export const Chevron = styled.span`
  display: inline-block;
  width: ${({ size }) => size || '13px'};
  height:${({ size }) => size || '13px'};

  ${({ color }) => color && `
  border-top: 2px solid ${color}; 
  border-right: 2px solid ${color};
  `};

  ${({ up }) => up && `transform: rotate(-45deg);`};
  ${({ down }) => down && `transform: rotate(135deg);`};
  ${({ left }) => left && `transform: rotate(-135deg);`};
  ${({ right }) => right && `transform: rotate(45deg);`};

  transition: all 0.3s ease-in-out;
`;

export const ChevronContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ w }) => w || '100%'};
  height: ${({ h }) => h || '100%'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ pad }) => pad || '0px'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border: ${({ border }) => border || 'none'};
  cursor: ${({ cursor }) => cursor || 'pointer'};

  &:hover ${Chevron} {
    border-top: 2px solid ${({ hoverColor }) => hoverColor || '#000'};
    border-right: 2px solid ${({ hoverColor }) => hoverColor || '#000'};
  }
`;