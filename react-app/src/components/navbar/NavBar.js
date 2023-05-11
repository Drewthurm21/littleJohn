import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { NavContainer } from '../styledComponents/containers';
import { NavbarBtn } from '../styledComponents/buttons';
import { GlassBox, ImageDiv, StyledDiv } from '../styledComponents/misc';
import LogoutButton from '../auth/LogoutButton';
import Searchbar from './Searchbar';



export default function Navbar() {

  const currentUser = useSelector(state => state.session.user);

  return (
    <>
      <NavContainer>
        <NavLink to={'/'}>
          <ImageDiv h='40px' w='15em' bgImage={bannerImgSrc} />
        </NavLink>
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
          {currentUser ?
            <LogoutButton /> :
            <>
              <NavbarBtn to={'/login'} exact={true}>Login</NavbarBtn>
              <NavbarBtn to={'/signup'} exact={true}>Sign Up</NavbarBtn>
            </>
          }
        </StyledDiv>
      </NavContainer>
      <GlassBox position='fixed' w='100%' top={'4rem'} />
    </>
  );
}

const bannerImgSrc = 'https://github.com/Drewthurm21/littleJohn/blob/main/react-app/src/assets/littleJohnBanner.png?raw=true'