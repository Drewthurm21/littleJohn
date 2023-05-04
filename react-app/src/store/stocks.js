import { fetchWatchlistItemData, fetchCompanyQuote } from "../api/alphaVantage";

const SET_SPARKLINE_INFO = 'stocks/SET_SPARKLINE_INFO';
const ADD_COMPANY_QUOTE = 'stocks/ADD_COMPANY_QUOTE';

const setSparklineInfo = (sparklineInfo) => ({
  type: SET_SPARKLINE_INFO,
  payload: sparklineInfo
});

const addCompanyQuote = (quote) => ({
  type: ADD_COMPANY_QUOTE,
  payload: quote
});

export const getSparklineInfoThunk = (ticker, apiKey) => async (dispatch) => {
  const data = await fetchWatchlistItemData(ticker, apiKey);

  if (data) {
    dispatch(setSparklineInfo({ ticker, data }));
  }
}

export const getCompanyQuoteThunk = (ticker, apiKey) => async (dispatch) => {
  const data = await fetchCompanyQuote(ticker, apiKey);

  if (data) {
    dispatch(addCompanyQuote(data));
  }
};


const initialState = {
  sparklineInfo: null,
  quotes: {}
};

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
    case ADD_COMPANY_QUOTE:
      return {
        ...state,
        quotes: {
          ...state.quotes,
          [action.payload['01. symbol']]: action.payload
        }
      }
    default:
      return state;
  }
}