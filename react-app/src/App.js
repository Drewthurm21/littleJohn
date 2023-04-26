import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import { AppInnerContainer, AppGridContainer } from './components/styledComponents/containers';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './SplashPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import MissingPage from './MissingPage';
import './index.css';


function App() {
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);

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
              <h1> HOME </h1>
            </ProtectedRoute>
            <ProtectedRoute path='/portfolios' exact={true} >
              <h1> portfolios </h1>
            </ProtectedRoute>
            <ProtectedRoute path='/trades' exact={true} >
              <h1> trades </h1>
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
