import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createWatchlistThunk, getWatchlistsThunk } from '../../store/watchlists'
import { StyledDiv, StyledInput } from '../styledComponents/misc'
import { PlusBtn } from '../styledComponents/buttons'
import Watchlist from './Watchlist'


export default function Sidebar() {
  const dispatch = useDispatch()
  const [refreshLists, setRefreshLists] = useState(false)
  const [showCreateList, setShowCreateList] = useState(false)
  const [newListName, setNewListName] = useState('')

  const user = useSelector(state => state.session.user)
  const watchlists = useSelector(state => state.watchlists)

  useEffect(() => {
    dispatch(getWatchlistsThunk(user.id))
    setRefreshLists(!refreshLists)
  }, [dispatch, user.id])

  const handleCreateWatchlist = () => {
    console.log('in the watchlist create handler')
    dispatch(createWatchlistThunk({ name: newListName, owner_id: user.id }))
    setNewListName('')
    setShowCreateList(false)
    setRefreshLists(!refreshLists)
  }

  return (
    <StyledDiv
      w='20vw' minH='40vh' col
      margin='0 2vw 0 0' pad='4px'
      border='1px solid var(--gray-400)'
    >
      <StyledDiv direction='column' spaceBetween
        txSize='18px' txWeight='bold' margin='1vh 0' minH='3vh'
        customBorder='border-bottom: 1px solid var(--gray-400);'
      >
        <StyledDiv w='100%' spaceBetween>

          <StyledDiv bold >Watchlists</StyledDiv>
          <StyledDiv w='15px' h='15px' margin='5px 10px 0 0'>
            <PlusBtn colorHover='var(--money-green)'
              onClick={() => setShowCreateList(!showCreateList)} />
          </StyledDiv>
        </StyledDiv>
        {showCreateList &&
          <StyledDiv justify='flex-end'>
            <StyledInput
              w='100%' h='30px' margin='5px 0'
              value={newListName}
              placeholder='Enter name here...'
              phSize='10px'
              onChange={(e) => setNewListName(e.target.value)}
              onBlur={() => setShowCreateList(false)}
              onKeyPress={(e) => e.key === 'Enter' ? handleCreateWatchlist() : null}
            />
            <StyledDiv margin='0 5px 8px 0'
              txColorHover='var(--money-green)'
            >Confirm</StyledDiv>
          </StyledDiv>
        }
      </StyledDiv>
      <StyledDiv col  >
        {
          Object.values(watchlists)?.map(list => (
            <Watchlist key={list.id} watchlist={list} />
          ))
        }
      </StyledDiv >
    </StyledDiv >
  )
}