import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const CustomBtn = styled.button`
  /* Text */
  font-size: ${({ txSize }) => txSize || '1em'};
  font-weight: ${({ txWeight }) => txWeight || 'normal'};
  font-family: ${({ txFont }) => txFont || 'inherit'};
  text-decoration: ${({ txDeco }) => txDeco || 'none'};
  ${({ txSmall }) => txSmall && ({ fontSize: '0.8em' })}
  ${({ txMedium }) => txMedium && ({ fontSize: '1.2em' })}
  ${({ txLarge }) => txLarge && ({ fontSize: '1.6em' })}
  ${({ txXLarge }) => txXLarge && ({ fontSize: '2em' })}

  /* Colors & Border */
  color: ${({ txColor }) => txColor || 'black'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ radius }) => radius || '3px'};
  box-shadow: ${({ shadow }) => shadow || 'none'};
  ${({ rounded }) => rounded && 'border-radius: 24px'};

  /* Size & Space */
  width: ${({ w }) => w || '170px'};
  height: ${({ h }) => h || '45px'};
  min-width: ${({ minW }) => minW || '170px'};
  min-height: ${({ minH }) => minH || '45px'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ pad }) => pad || '0px'};


  /* Misc */
  overflow: ${({ overflow }) => overflow || 'hidden'};
  transition: ${({ transition }) => transition || ''};
  cursor: ${({ cursor }) => cursor || 'pointer'};
  content: ${({ content }) => content || 'none'};

  &:hover {
    background-color: ${({ bgColorHover }) => bgColorHover || ''};
    box-shadow: ${({ shadowHover }) => shadowHover || ''};
    transform: ${({ transformHover }) => transformHover || ''};
    transition: ${({ transitionHover }) => transitionHover || 'all 0.3s ease-in-out'};
  }
`;

export const SimpleBtn = styled.div`
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #3d3935;
  }
`;

export const NavbarBtn = styled(NavLink)`
  color: var(--eerie-black);
  text-decoration: none;
  border-radius: 4px;
  height: 103%;
  width: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3em 0 0;
  margin-bottom: 3px;

  &:hover {
    border-bottom: 3px solid #00cf98;
    -webkit-box-shadow: 0 6px 4px -4px #00cf98;
    -moz-box-shadow: 0 6px 4px -4px #00cf98;
    box-shadow: 0px 4px -4px #00cf98;
  }
`;


export const PlusBtn = styled.div`
  width: 30px;
  height: 30px;
  transform: translateY(-50%);
  padding: 0;
  margin: 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: #3d3935;
    transition: transform 0.25s ease-out;
  }

  &::before {
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    margin-left: -2px;
  }

  &::after {
    top: 50%;
    left: 0;
    width: 100%;
    height: 4px;
    margin-top: -2px;
  }
`;