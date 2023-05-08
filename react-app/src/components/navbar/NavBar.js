import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import * as sc from '../styledComponents'
const {
  containers: { NavContainer, NavBtnContainer },
  misc: { ImageDiv, GlassBox },
  buttons: { NavbarBtn }
} = sc;


export default function Navbar() {

  const currentUser = useSelector(state => state.session.user);

  let userLinks;
  if (currentUser) userLinks = <LogoutButton />
  else userLinks = (
    <>
      <NavbarBtn to={'/login'} exact={true}>Login</NavbarBtn>
      <NavbarBtn to={'/signup'} exact={true}>Sign Up</NavbarBtn>
    </>
  )
  return (
    <>
      <NavContainer>
        <NavLink to='/' exact={true} activeClassName='active'>
          <ImageDiv h='40px' w='15em' bgImage={bannerImgSrc} />
        </NavLink>
        <NavBtnContainer>
          {[['/home', 'Home'],
          ['/portfolios', 'Portfolios'],
          ['/trades', 'Trades']].map(([url, label], i) => (
            <NavbarBtn key={i} to={url}>{label}</NavbarBtn>
          ))}
        </NavBtnContainer>
        <div style={{ display: 'flex', flexDirection: 'row', width: '15em', height: '100%', justifyContent: 'center', paddingBottom: '3px' }}>
          {userLinks}
        </div>
      </NavContainer>
      <GlassBox position='fixed' w='100%' top={'4rem'} />
    </>
  );
}

const bannerImgSrc = 'https://github.com/Drewthurm21/littleJohn/blob/main/react-app/src/assets/littleJohnBanner.png?raw=true'