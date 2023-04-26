import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { CustomBtn } from '../styledComponents/buttons'
import { StyledDiv, StyledInput, StyledSpan } from '../styledComponents/misc'


const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [errors, setErrors] = useState(null);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    //prevent err msg on initial render
    if (initialRender) {
      setInitialRender(false);
      return;
    };

    const errors = {};

    //simple email & password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) setEmailValid(true)
    else {
      setEmailValid(false)
      errors.email = 'Please enter a valid email address';
    }

    if (password.length > 5) setPasswordValid(true)
    else {
      setPasswordValid(false)
      errors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(errors).length !== 0) setErrors(errors);
    else setErrors(null);

  }, [email, emailValid, password, passwordValid])

  const user = useSelector(state => state.session.user);
  if (user) return <Redirect to='/' />;

  const onLogin = async () => {
    const data = await dispatch(login(email, password));
    if (data) setErrors(data);
  };

  const demoLogin = async () => {
    const data = await dispatch(login('littleJohn@littleJohn.com', 'password'));
    if (data) setErrors(data);
  };

  return (
    <StyledDiv direction='column'>

      <label style={{ color: 'black' }} htmlFor='email'>Email</label>
      {errors && errors.email && <StyledDiv>{errors.email}</StyledDiv>}
      <StyledDiv direction='row'>
        <StyledInput rounded h='2vw' w='18vw' margin='8px 0 2vh 0'
          name='email' type='text' value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailValid && <StyledSpan txSize='1.7vh' margin='8px' color='green'>✓</StyledSpan>}
      </StyledDiv>

      <label style={{ color: 'black' }} htmlFor='password'>Password</label>
      {errors && errors.password && <StyledDiv>{errors.password}</StyledDiv>}
      <StyledDiv direction='row'>
        <StyledInput rounded h='2vw' w='18vw' margin='8px 0 0 0'
          name='password' type='password' value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordValid && <StyledSpan txSize='1.7vh' margin='8px' color='green'>✓</StyledSpan>}
      </StyledDiv>

      <CustomBtn rounded w='70px' h='45px' minW='170px' margin='2vh 0 0 0'
        txColor='white' border='1px solid white' bgColor='black'
        onClick={onLogin}
      >Log In</CustomBtn>

      <CustomBtn rounded w='70px' h='45px' minW='170px' margin='2vh 0 0 0'
        txColor='white' border='1px solid white' bgColor='black'
        onClick={demoLogin}
      >Log in as Demo User</CustomBtn>

    </StyledDiv>
  );
};

export default LoginForm;
