import React, { useState } from 'react';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
// react router
import { Link, Redirect } from 'react-router-dom';

const emptyLoginForm = {
  email: '',
  password: '',
};

const Login = ({ login, isAuthenticated }) => {
  const [userLoginForm, setUserLoginForm] = useState(emptyLoginForm);

  const { email, password } = userLoginForm;

  const onChange = (e) =>
    setUserLoginForm({
      ...userLoginForm,
      [e.target.name]: e.target.value,
    });

  const onSumbmit = async (e) => {
    e.preventDefault();
    login(email, password);
    setUserLoginForm({
      ...userLoginForm,
      password: '',
    });
  };

  // If logged in we want to redirect the user

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <>
      <div
        className='container-bg'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className='register-card'>
          <div>
            <h3 className='register-title register-align'>Login</h3>
          </div>
          <form action='' className='register-form' onSubmit={onSumbmit}>
            <label htmlFor='email' className='register-label'>
              Email
            </label>
            <input
              onChange={(e) => onChange(e)}
              type='text'
              id='email'
              value={email}
              className='register-input'
              placeholder='Email address'
              name='email'
              required
            />

            <label htmlFor='password' className='register-label'>
              Password
            </label>
            <input
              onChange={(e) => onChange(e)}
              type='password'
              id='password'
              value={password}
              name='password'
              className='register-input'
              placeholder='Password'
              required
            />
            <button type='submit' className='register-btn'>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
