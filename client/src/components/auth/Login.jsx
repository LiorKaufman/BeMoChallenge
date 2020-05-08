import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import '../../resources/css/Login.css';

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

function Login({ login, isAuthenticated }) {
  const [userLoginForm, setUserLoginForm] = useState(emptyLoginForm);

  const { email, password } = userLoginForm;

  const onChange = (e) =>
    setUserLoginForm({
      ...userLoginForm,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    setUserLoginForm({
      ...userLoginForm,
      password: '',
    });
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <div className='box'></div>
      <div className='Login'>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId='email' bssize='large'>
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type='email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </FormGroup>
          <FormGroup controlId='password' bsSize='large'>
            <FormLabel>Password</FormLabel>
            <FormControl
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              type='password'
            />
          </FormGroup>
          <Button block bsSize='large' type='submit'>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
