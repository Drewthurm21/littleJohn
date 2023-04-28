const GET_WATCHLISTS = 'watchlists/GET_WATCHLISTS';
const ADD_WATCHLIST = 'watchlists/ADD_WATCHLIST';
const DELETE_WATCHLIST = 'watchlists/DELETE_WATCHLIST';
const UPDATE_WATCHLIST = 'watchlists/UPDATE_WATCHLIST';

const getWatchlists = (watchlists) => ({
  type: GET_WATCHLISTS,
  watchlists
});

const addWatchlist = (watchlist) => ({
  type: ADD_WATCHLIST,
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
