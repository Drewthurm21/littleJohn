import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const StyledLink = styled(NavLink)`
  color: #000;
  text-decoration: none;
  margin: 1rem;
  height: 100%;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: bold;
  }
`;

const NavContainer = styled.nav`
  border: 1px solid #000;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;


const links = [['/', 'Home'], ['/login', 'Login'], ['/sign-up', 'Sign Up']];

export default function Navbar() {
  return (
    <NavContainer>
      {links.map(([url, label], i) => <StyledLink key={i} to={url}>{label}</StyledLink>)}
      <LogoutButton />
    </NavContainer>
  );
}