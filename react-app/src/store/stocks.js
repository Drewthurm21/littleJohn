import { fetchWatchlistItemData, fetchCompanyQuote } from "../api/alphaVantage";

const SET_CURRENT_PRICE = 'stocks/SET_CURRENT_PRICE';
const ADD_COMPANY_QUOTE = 'stocks/ADD_COMPANY_QUOTE';
const SET_SPARKLINE_INFO = 'stocks/SET_SPARKLINE_INFO';

const setSparklineInfo = (sparklineInfo) => ({
  type: SET_SPARKLINE_INFO,
  payload: sparklineInfo
});

const addCompanyQuote = (quote) => ({
  type: ADD_COMPANY_QUOTE,
  payload: quote
});

const setCurrentPrice = (info) => ({
  type: SET_CURRENT_PRICE,
  payload: info
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

export const updateCurrentPriceThunk = (ticker, price) => (dispatch) => {
  dispatch(setCurrentPrice({ ticker, price }));
};

const initialState = {
  quotes: {},
  sparklineInfo: null,
  currentPrices: {}
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
        currentPrices: {
          ...state.currentPrices,
          [action.payload['01. symbol']]: Number(action.payload['05. price'])
        },
        quotes: {
          ...state.quotes,
          [action.payload['01. symbol']]: action.payload
        }
      }
    case SET_CURRENT_PRICE:
      return {
        ...state,
        currentPrices: {
          ...state.currentPrices,
          [action.payload.ticker]: action.payload.price
        }
      }
    default:
      return state;
  }
}