import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StyledDiv } from '../styledComponents/misc'
import { Container } from '../styledComponents/containers'
import Sidebar from '../sidebar/'

export default function TradePage() {
  const history = useHistory()
  const currentUser = useSelector(state => state.session.user);
  const portfolios = useSelector(state => state.portfolios);

  if (!currentUser) history.push('/');

  return (
    <Container margin='5vh 3vw 0 0' spaceBetween align='flex-start'>

      <Container inner col>
        <StyledDiv w='100%' h='25vh'>
          Header
        </StyledDiv>
        <StyledDiv h='40vh'>
          Main
        </StyledDiv>
      </Container>

      <Sidebar watchlists={true} />
    </Container>
  )
};