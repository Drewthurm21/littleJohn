import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import { AppInnerContainer, AppGridContainer } from './components/styledComponents/containers';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './components/splashpage';
import SignupPage from './components/auth/SignupPage';
import LoginPage from './components/auth/LoginPage';
import MissingPage from './components/MissingPage';
import HomePage from './components/homepage/HomePage';
import StockPage from './components/stockpage/StockPage';
import TradePage from './components/tradepage/TradePage';
import PortfolioPage from './components/portfoliopage/PortfolioPage';

import './index.css';


function App() {
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <AppGridContainer>
        <NavBar />
        <AppInnerContainer>
          <Switch>
            <Route path='/login' exact={true}>
              <LoginPage />
            </Route>
            <Route path='/signup' exact={true}>
              <SignupPage />
            </Route>
            <ProtectedRoute path='/home' exact={true} >
              <HomePage />
            </ProtectedRoute>
            <ProtectedRoute path='/portfolios' exact={true} >
              <PortfolioPage />
            </ProtectedRoute>
            <ProtectedRoute path='/stocks/:ticker' exact={true} >
              <StockPage />
            </ProtectedRoute>
            <ProtectedRoute path='/trades' exact={true} >
              <TradePage />
            </ProtectedRoute>
            <Route path='/' exact={true} >
              <SplashPage />
            </Route>
            <Route path='*'>
              <MissingPage />
            </Route>
          </Switch>
        </AppInnerContainer>
        <div className='footer'>Footer</div>
      </AppGridContainer>
    </BrowserRouter>
  );
}

export default App;
