import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import * as sc from './styledComponents/'
const { NavContainer, NavBtnContainer } = sc.containers;
const { CrossBar, BannerImg } = sc.misc;
const { NavbarBtn } = sc.buttons;


export default function Navbar() {

  const currentUser = useSelector(state => state.session.user);

  let userLinks;
  if (currentUser) userLinks = <LogoutButton />
  else userLinks = <NavbarBtn to={'/login'} exact={true}>Login</NavbarBtn>

  return (
    <>
      <CrossBar />
      <NavContainer>
        <NavLink to='/' exact={true} activeClassName='active'>
          <BannerImg />
        </NavLink>
        <NavBtnContainer>
          {[['/', 'Home'],
          ['/portfolios', 'Portfolios'],
          ['/trades', 'Trades']].map(([url, label], i) => (
            <NavbarBtn key={i} to={url}>{label}</NavbarBtn>
          ))}
        </NavBtnContainer>
        <div style={{ width: '15em', height: '100%', justifyContent: 'center' }}>
          {userLinks}
        </div>
      </NavContainer>
    </>
  );
}