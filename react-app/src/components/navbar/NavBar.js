import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import * as sc from '../styledComponents'
import Searchbar from './Searchbar';
const {
  containers: { NavContainer, NavBtnContainer },
  misc: { ImageDiv, GlassBox, StyledDiv },
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
        <ImageDiv h='40px' w='15em' bgImage={bannerImgSrc} />

        {currentUser &&
          <Searchbar />
        }

        <StyledDiv h='100%' spaceBetween>
          {currentUser &&
            [['/home', 'Home'],
            ['/portfolios', 'Portfolios'],
            ['/trades', 'Trades']
            ].map(([url, label], i) => (
              <NavbarBtn key={i} to={url}>{label}</NavbarBtn>
            ))
          }
          {userLinks}
        </StyledDiv>
      </NavContainer>
      <GlassBox position='fixed' w='100%' top={'4rem'} />
    </>
  );
}

const bannerImgSrc = 'https://github.com/Drewthurm21/littleJohn/blob/main/react-app/src/assets/littleJohnBanner.png?raw=true'