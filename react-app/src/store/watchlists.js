const GET_WATCHLISTS = 'watchlists/GET_WATCHLISTS';
const CREATE_WATCHLIST = 'watchlists/CREATE_WATCHLIST';
const DELETE_WATCHLIST = 'watchlists/DELETE_WATCHLIST';
const UPDATE_WATCHLIST = 'watchlists/UPDATE_WATCHLIST';

const getWatchlists = (watchlists) => ({
  type: GET_WATCHLISTS,
  watchlists
});

const addWatchlist = (watchlist) => ({
  type: CREATE_WATCHLIST,
  watchlist
});

const deleteWatchlist = (watchlistId) => ({
  type: DELETE_WATCHLIST,
  watchlistId
});

const updateWatchlist = (watchlist) => ({
  type: UPDATE_WATCHLIST,
  watchlist
});

export const getWatchlistsThunk = () => async (dispatch) => {
  const response = await fetch('/api/watchlists/');
  const watchlists = await response.json();
  dispatch(getWatchlists(watchlists));
}

export const addWatchlistThunk = (watchlist) => async (dispatch) => {
  const response = await fetch('/api/watchlists/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(watchlist)
  });
  const newWatchlist = await response.json();
  dispatch(addWatchlist(newWatchlist));
}

export const deleteWatchlistThunk = (watchlistId) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${watchlistId}`, {
    method: 'DELETE'
  });
  const deletedWatchlist = await response.json();
  dispatch(deleteWatchlist(deletedWatchlist.id));
}

export const updateWatchlistThunk = (watchlist) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${watchlist.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(watchlist)
  });
  const updatedWatchlist = await response.json();
  dispatch(updateWatchlist(updatedWatchlist));
}

const initialState = {};

export default function watchlistReducer(state = initialState, action) {

  switch (action.type) {
    case GET_WATCHLISTS:
      return action.watchlists
    case CREATE_WATCHLIST:
      return {
        ...state,
        [action.watchlist.id]: action.watchlist
      }
    case DELETE_WATCHLIST:
      const newState = { ...state };
      delete newState[action.watchlistId];
      return newState;
    case UPDATE_WATCHLIST:
      return {
        ...state,
        [action.watchlist.id]: action.watchlist
      }
    default:
      return state;
  }
};