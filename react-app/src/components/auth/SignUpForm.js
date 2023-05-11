import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import { CustomBtn } from '../styledComponents/buttons';
import { StyledDiv, StyledInput, Checkmark } from '../styledComponents/misc';
import { signupFormValidator } from './FormValidators';


const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [signupClicked, setSignupClicked] = useState(false);

  useEffect(() => {
    const formInfo = { username, email, password, repeatPassword };
    const validatedForm = signupFormValidator(formInfo);

    if (validatedForm.isValid) setErrors({})
    else setErrors(validatedForm.errors);

  }, [email, password, repeatPassword, username, signupClicked])

  const user = useSelector(state => state.session.user);
  if (user) return <Redirect to='/home' />;

  const createInput = (options, i) => {
    const { label, type, name, value, checkVal, onChange } = options;
    return (<>
      <label key={`${name}-${i}`} style={{ color: 'black' }} htmlFor='email'>{label}</label>
      {signupClicked && errors[name] && <StyledDiv>{errors[name]}</StyledDiv>}
      <StyledDiv key={i}>
        <StyledInput h='3vw' w='18vw' margin='8px 0 2vh 0'
          name='email' type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {!checkVal && <Checkmark>✓</Checkmark>}
      </StyledDiv>
    </>
    )
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    setSignupClicked(true);
    if (Object.keys(errors).length) return;

    const data = await dispatch(signUp(username, email, password));
    if (data) setErrors(data)
    else {
      dispatch(login(email, password));
      history.push('/home')
    }
  };

  const demoLogin = async () => {
    const data = await dispatch(login('littleJohn@littleJohn.com', 'password'));
    if (data) setErrors(data);
  };

  return (
    <StyledDiv col  >
      {
        [
          {
            label: 'Username', type: 'text', name: 'username',
            value: username, checkVal: errors.username, onChange: setUsername
          },
          {
            label: 'Email', type: 'text', name: 'email',
            value: email, checkVal: errors.email, onChange: setEmail
          },
          {
            label: 'Password', type: 'password', name: 'password',
            value: password, checkVal: errors.password, onChange: setPassword
          },
          {
            label: 'Repeat Password', type: 'password', name: 'repeatPassword',
            value: repeatPassword, checkVal: errors.repeatPassword, onChange: setRepeatPassword
          },
        ].map((input, i) => createInput(input, i))
      }

      < CustomBtn rounded margin='0 0 2vh 0'
        txColor='white' bgColor='black'
        onClick={onSignUp}
      > Sign Up</CustomBtn >

      <CustomBtn rounded
        txColor='white' bgColor='black'
        onClick={demoLogin}
      >Log in as Demo User</CustomBtn>

    </StyledDiv >
  );
};

export default SignUpForm;
