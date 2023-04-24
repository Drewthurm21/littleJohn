import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import { AppInnerContainer, AppGridContainer } from './components/styledComponents/containers';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './components/SplashPage';

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
              <LoginForm />
            </Route>
            <Route path='/signup' exact={true}>
              <SignUpForm />
            </Route>
            <Route path='/home' exact={true} >
              {currentUser ?
                <h1> HOME </h1> :
                <SplashPage />}
            </Route>
            <Route path='/' exact={true} >
              <Redirect to='/home' />
            </Route>
            <ProtectedRoute path='*'>
              <h1 style={{ color: 'black' }}>404: Page Not Found</h1>
            </ProtectedRoute>
          </Switch>
          <footer>Footer</footer>
        </AppInnerContainer>
      </AppGridContainer>
    </BrowserRouter>
  );
}

export default App;
