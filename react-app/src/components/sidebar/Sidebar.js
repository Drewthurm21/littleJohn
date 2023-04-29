import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWatchlistsThunk } from '../../store/watchlists'
import { StyledDiv, StyledSpan } from '../styledComponents/misc'
import { PlusBtn } from '../styledComponents/buttons'
import Watchlist from './Watchlist'


export default function Sidebar() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const watchlists = useSelector(state => state.watchlists)

  useEffect(() => {
    dispatch(getWatchlistsThunk(user.id))
  }, [])


  return (

    <StyledDiv position='sticky' w='20vw' h='100%' direction='column'
      margin='0 2vw 0 0' pad='8px'
      border='1px solid var(--gray-200)' >
      <StyledDiv justify='space-between' align='center'
        txSize='18px' txWeight='bold' margin='1vh 0'
        customBorder='border-bottom: 1px solid var(--gray-200);'
      >
        <StyledSpan >Lists</StyledSpan>

        <StyledDiv w='15px' h='15px'>
          <PlusBtn />
        </StyledDiv>
      </StyledDiv>
      <StyledDiv direction='column'>
        {Object.values(watchlists)?.map(list => (
          <Watchlist key={list.id} {...list} />
        ))}
      </StyledDiv>


    </StyledDiv>
  )
}