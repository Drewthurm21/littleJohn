import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const CustomBtn = styled.button`
  /* Text */
  font-size: ${({ txSize }) => txSize || '1em'};
  font-weight: ${({ txWeight }) => txWeight || 'normal'};
  font-family: ${({ txFont }) => txFont || 'inherit'};
  text-decoration: ${({ txDeco }) => txDeco || 'none'};
  ${({ txSmall }) => txSmall && ({ fontSize: 'var(--txSmall)' })}
  ${({ txMedium }) => txMedium && ({ fontSize: 'var(--txMedium)' })}
  ${({ txLarge }) => txLarge && ({ fontSize: 'var(--txLarge)' })}
  ${({ txXLarge }) => txXLarge && ({ fontSize: 'var(--txXLarge)' })}
  ${({ bold }) => bold && ({ fontWeight: 'bold' })}

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
  
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--gray-50);
    color: var(--eerie-black);
  `}

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
  width: 100%;
  height: 100%;
  transform: translateY(-10%);
  padding: 0;
  margin: 0;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    transition: all 0.3s ease-in-out;
    background-color: ${({ color }) => color || 'black'}
  }

  &::before {
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    margin-left: -1px;
    background-color: ${({ color }) => color || 'black'}
  }
  
  &::after {
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    margin-top: -1px;
    background-color: ${({ color }) => color || 'black'}
  } 

   
  &:hover::before,
  :hover::after {
    transition: all 0.3s ease-in-out;
    rotate: 180deg;
    background-color: ${({ colorHover }) => colorHover || 'black'}
  }
`;