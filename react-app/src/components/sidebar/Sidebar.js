import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWatchlistsThunk } from '../../store/watchlists'
import { StyledDiv } from '../styledComponents/misc'
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

    <StyledDiv
      w='20vw' h='100%' col
      margin='0 2vw 0 0' pad='4px'
      border='1px solid var(--gray-400)' >

      <StyledDiv
        spaceBetween align='center' h='3vh'
        txSize='18px' txWeight='bold' margin='1vh 0'
        customBorder='border-bottom: 1px solid var(--gray-400);'
      >
        <StyledDiv bold >Watchlists</StyledDiv>
        <StyledDiv w='45px' justify='center' align='center'
          radius='5px' cursor='pointer' bold
          bgColorHover='var(--gray-400)'
          onClick={() => console.log('click')}>...</StyledDiv>
      </StyledDiv>

      <StyledDiv col  >
        {
          Object.values(watchlists)?.map(list => (
            <Watchlist key={list.id} {...list} />
          ))
        }
      </StyledDiv >


    </StyledDiv >
  )
}