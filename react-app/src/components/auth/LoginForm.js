import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { CustomBtn } from '../styledComponents/buttons'
import { StyledDiv, StyledInput, Checkmark } from '../styledComponents/misc'
import { loginFormValidator } from './FormValidators';


const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginClicked, setLoginClicked] = useState(false);

  const user = useSelector(state => state.session.user);

  useEffect(() => {
    const formInfo = { email, password };
    const validatedForm = loginFormValidator(formInfo);

    if (validatedForm.isValid) setErrors({})
    else setErrors(validatedForm.errors);
  }, [email, password])

  if (user) return <Redirect to='/' />;

  const onLogin = async () => {
    setLoginClicked(true);
    if (Object.keys(errors).length) return;

    const data = await dispatch(login(email, password));
    if (data) setErrors(data);
  };

  const demoLogin = async () => {
    const data = await dispatch(login('littleJohn@littleJohn.com', 'password'));
    if (data) setErrors(data);
  };

  return (
    <StyledDiv col  >

      <label style={{ color: 'black' }} htmlFor='email'>Email</label>
      {loginClicked && errors.email && <StyledDiv>{errors.email}</StyledDiv>}
      <StyledDiv>
        <StyledInput rounded h='3vw' w='18vw' margin='8px 0 2vh 0'
          name='email' type='text' value={email}
          onChange={(e) => setEmail(e.target.value)} />
        {!errors.email && <Checkmark>✓</Checkmark>}
      </StyledDiv>

      <label style={{ color: 'black' }} htmlFor='password'>Password</label>
      {loginClicked && errors.password && <StyledDiv>{errors.password}</StyledDiv>}
      <StyledDiv>
        <StyledInput rounded h='3vw' w='18vw' margin='8px 0 0 0'
          name='password' type='password' value={password}
          onChange={(e) => setPassword(e.target.value)} />
        {!errors.password && <Checkmark>✓</Checkmark>}
      </StyledDiv>

      <CustomBtn rounded margin='2vh 0' txColor='white' bgColor='black' onClick={onLogin}>Log In</CustomBtn>
      <CustomBtn rounded txColor='white' bgColor='black' onClick={demoLogin}>Log in as Demo User</CustomBtn>

    </StyledDiv >
  );
};

export default LoginForm;
