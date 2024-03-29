const GET_PORTFOLIOS = 'portfolios/GET_PORTFOLIOS';
const CREATE_PORTFOLIO = 'portfolios/CREATE_PORTFOLIO';
const DELETE_PORTFOLIO = 'portfolios/DELETE_PORTFOLIO';
const UPDATE_PORTFOLIO = 'portfolios/UPDATE_PORTFOLIO';

const getPortfolios = (portfolios) => ({
  type: GET_PORTFOLIOS,
  portfolios
});

const createPortfolio = (portfolio) => ({
  type: CREATE_PORTFOLIO,
  portfolio
});

const deletePortfolio = (portfolioId) => ({
  type: DELETE_PORTFOLIO,
  portfolioId
});

const updatePortfolio = (portfolio) => ({
  type: UPDATE_PORTFOLIO,
  portfolio
});

export const enactPortfolioTrade = (trade) => async (dispatch) => {
  const response = await fetch(`/api/trades/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trade)
  });

  const updatedPortfolio = await response.json();
  dispatch(updatePortfolio(updatedPortfolio));
};


export const depositPortfolioFunds = (portfolioId, amount) => async (dispatch) => {
  const response = await fetch(`/api/portfolios/${portfolioId}/deposit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });

  const updatedPortfolio = await response.json();
  dispatch(updatePortfolio(updatedPortfolio));
};


export const getPortfoliosThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/portfolios`);
  const portfolios = await response.json();
  dispatch(getPortfolios(portfolios));
};

export const createPortfolioThunk = (portfolio) => async (dispatch) => {
  const response = await fetch(`/api/portfolios/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(portfolio)
  });
  const newPortfolio = await response.json();
  dispatch(createPortfolio(newPortfolio));
  return newPortfolio.id;
};

export const deletePortfolioThunk = (portfolioId) => async (dispatch) => {
  const response = await fetch(`/api/portfolios/${portfolioId}`, {
    method: 'DELETE'
  });
  const deletedPortfolio = await response.json();
  dispatch(deletePortfolio(deletedPortfolio.id));
};

export const updatePortfolioThunk = (portfolio) => async (dispatch) => {
  const response = await fetch(`/api/portfolios/${portfolio.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(portfolio)
  });
  const updatedPortfolio = await response.json();
  dispatch(updatePortfolio(updatedPortfolio));
};

const initialState = {};

export default function portfoliosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIOS:
      return action.portfolios;
    case CREATE_PORTFOLIO:
      return { ...state, [action.portfolio.id]: action.portfolio };
    case DELETE_PORTFOLIO:
      const newState = { ...state };
      delete newState[action.portfolioId];
      return newState;
    case UPDATE_PORTFOLIO:
      return { ...state, [action.portfolio.id]: action.portfolio };
    default:
      return state;
  }
}
