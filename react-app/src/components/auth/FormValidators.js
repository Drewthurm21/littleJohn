export const loginFormValidator = ({ email, password }) => {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.length < 5 || !emailRegex.test(email))
    errors.email = 'Please enter a valid email address';
  if (password.length < 6) errors.password = 'Passwords must be at least 6 characters';

  if (Object.keys(errors).length === 0) return { isValid: true };
  else return { isValed: false, errors: { ...errors } };
}


export const signupFormValidator = ({ email, username, password, repeatPassword }) => {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.length < 5 || !emailRegex.test(email))
    errors.email = 'Please enter a valid email address';

  if (repeatPassword.length < 6 || repeatPassword !== password)
    errors.repeatPassword = 'Password entries must match';

  if (username.length < 6) errors.username = 'Username must be at least 6 characters';
  if (password.length < 6) errors.password = 'Password must be at least 6 characters';


  if (Object.keys(errors).length === 0) return { isValid: true };
  else return { isValed: false, errors: { ...errors } };
}