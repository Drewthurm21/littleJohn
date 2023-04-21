import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import { AppContainer } from './components/styledComponents/containers';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
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
      <AppContainer>
        <NavBar />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <Route path='/home' exact={true} >
            {currentUser ?
              <SplashPage /> :
              <h1> Welcome to the home page! </h1>}
          </Route>
          <Route path='/' exact={true} >
            <Redirect to='/home' />
          </Route>

          <ProtectedRoute path='*'>
            <h1>404: Page Not Found</h1>
          </ProtectedRoute>
        </Switch>
        <footer>Footer</footer>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
