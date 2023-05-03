import { getWatchlistItemData } from "../api/alphaVantage";
const SET_SPARKLINE_INFO = 'stocks/SET_SPARKLINE_INFO';

const setSparklineInfo = (sparklineInfo) => ({
  type: SET_SPARKLINE_INFO,
  payload: sparklineInfo
});


export const getSparklineInfo = (ticker, apiKey) => async (dispatch) => {
  const data = await getWatchlistItemData(ticker, apiKey);

  if (data) {
    dispatch(setSparklineInfo({ ticker, data }));
  }
}


const initialState = { sparklineInfo: null };

export default function stocksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPARKLINE_INFO:
      return {
        ...state,
        sparklineInfo: {
          ...state.sparklineInfo,
          [action.payload.ticker]: { ...action.payload.data }
        }
      }
    default:
      return state;
  }
}