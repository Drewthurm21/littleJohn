import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteWatchlistThunk, updateWatchlistThunk } from '../../store/watchlists';
import { StyledDiv, StyledSpan, StyledInput, ChevronContainer, Chevron } from '../styledComponents/misc';
import WatchlistItem from './WatchlistItem';

export default function Watchlist({ watchlist, addEvent }) {
  const menuRef = useRef()
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [editList, setEditList] = useState(false)
  const [showEditMenu, setShowEditMenu] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [watchlistName, setWatchlistName] = useState(watchlist.name)

  useEffect(() => {
    //close menu if click is outside
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        closeMenus()
        // if changed dispatch update & remove listener
        if (watchlistName !== watchlist.name) {
          updateWatchlistName()
          document.removeEventListener('mousedown', handler);
        }
      }
    };

    if (addEvent) document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    }
  }, [watchlistName]);

  const closeMenus = () => {
    setShowEditMenu(false)
    setEditList(false)
    setConfirmDelete(false)
  };

  const updateWatchlistName = () => {
    dispatch(updateWatchlistThunk({ id: watchlist.id, name: watchlistName }))
  };

  const beginListEdits = () => {
    setEditList(true)
    setShowEditMenu(false)
  };

  const handleDeleteList = () => {
    dispatch(deleteWatchlistThunk(watchlist.id))
    setEditList(false)
    setConfirmDelete(false)
    setRefresh(!refresh)
  };


  return (
    <StyledDiv col key={watchlist.name} ref={menuRef}>
      <StyledDiv align='center'>
        <StyledDiv h='3.5vh' w='100%' pad='3px' margin='0 0 1vh 0'
          spaceBetween align='center' bgColorHover='var(--gray-200)'
          customBorder='border-bottom: 1px solid var(--gray-900);'>
          {editList ? (
            <StyledInput w='70%' type='text' value={watchlistName}
              onChange={e => setWatchlistName(e.target.value)} />
          ) : (
            <StyledSpan txSize='18px' txWeight='bold'>{watchlistName}</StyledSpan>
          )
          }
          <StyledDiv w='30%' h='100%' spaceBetween>
            <StyledDiv w='40%' justify='center' align='center'
              radius='5px' cursor='pointer'
              bgColorHover='var(--gray-400)'
              onClick={() => setShowEditMenu(!showEditMenu)}>
              <StyledDiv bold>...</StyledDiv>
            </StyledDiv>
            {showEditMenu && (
              <StyledDiv w='110px' z='2' pad='8px' id='ex-container'
                position='absolute' translate='-40px, 35px'
                bgColor='var(--gray-200)' radius='18px'>
                <StyledDiv col center spaceBetween>
                  <StyledDiv pointer margin='8px' onClick={beginListEdits}>Edit List</StyledDiv>
                  <StyledDiv pointer margin='8px' onClick={() => setConfirmDelete(!confirmDelete)}>Delete List</StyledDiv>
                  {confirmDelete && <StyledDiv pointer margin='8px' onClick={handleDeleteList}>Confirm?</StyledDiv>}
                </StyledDiv>
              </StyledDiv>
            )}

            <StyledDiv w='20px'
              justify='center' align='center'
              onClick={() => setExpanded(!expanded)}>
              <ChevronContainer hoverColor='var(--money-green)'>
                <Chevron color='black' className={expanded ? 'rotate-down' : 'rotate-up'} />
              </ChevronContainer>
            </StyledDiv>
          </StyledDiv>
        </StyledDiv>

        <StyledDiv id='ex-container'>
          <StyledDiv id='watchlist' className={expanded ? 'expanded' : ''}>
            {watchlist.items.map((ticker, i) => (
              <WatchlistItem key={i + ticker} ticker={ticker} listId={watchlist.id} editList={editList} />
            ))}
          </StyledDiv>
        </StyledDiv>
      </StyledDiv >
    </StyledDiv >
  )
}
