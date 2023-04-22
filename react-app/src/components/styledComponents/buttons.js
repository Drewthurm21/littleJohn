import styled from "styled-components";
import { NavLink } from "react-router-dom";

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
  color: var(--black-ljt);
  text-decoration: none;
  border-radius: 4px;
  height: 103%;
  width: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3em 0 0;
  margin-bottom: 3px;
  z-index: 1;

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