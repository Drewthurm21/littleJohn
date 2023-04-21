import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styled from 'styled-components';
import * as sc from './styledComponents/'
const { NavContainer, NavBtns } = sc.containers;
const { CrossBar, BannerImg } = sc.misc;

const StyledLink = styled(NavLink)`
  color: #000;
  text-decoration: none;
  border-radius: 3px;
  height: 100%;
  width: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3em 0 0;

  &:hover {
    border-bottom: 3px solid #00cf98;
    -webkit-box-shadow: 0 6px 4px -4px #00cf98;
    -moz-box-shadow: 0 6px 4px -4px #00cf98;
    box-shadow: 0 px 4px -4px #00cf98;
  }

  &.active {
    text-decoration: underline;
  }
`;


export default function Navbar() {

  const currentUser = useSelector(state => state.session.user);

  let userLinks;
  if (currentUser) userLinks = <LogoutButton />
  else userLinks = <StyledLink to={'/login'} exact={true}>Login</StyledLink>


  return (
    <>
      <CrossBar />
      <NavContainer>
        <NavLink to='/' exact={true} activeClassName='active'>
          <BannerImg />
        </NavLink>
        <NavBtns>
          {[['/', 'Home'],
          ['/portfolios', 'Portfolios'],
          ['/trades', 'Trades']].map(([url, label], i) => (
            <StyledLink key={i} to={url}>{label}</StyledLink>
          ))}
        </NavBtns>
        <div style={{ width: '15em', height: '100%' }}>
          {userLinks}
        </div>
      </NavContainer>
    </>
  );
}