import React, { useState } from 'react';

// React router
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';

// images
import BrandLogo from '../resources/images/bemo-logo2.png';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleEditing = () => setIsEditing((prevState) => !prevState);

  return (
    <header className='navbar desktopScreenNavbar'>
      <div id='headwrap'>
        <div id='titlelogo'>
          <Link to='/'>
            <img
              src={BrandLogo}
              style={{
                width: '167px',
                height: '100px',
              }}
            />
          </Link>
        </div>

        <div id='mwrap' onClick={toggle}>
          <div id='lt'></div>
          <div id='lm'></div>
          <div id='lb'></div>
        </div>
        <div id='nwrap'>
          <div id='menuBtn' onClick={toggle}></div>
          <nav className={dropdownOpen ? 'show navb' : ''}>
            <ul className='navigation'>
              <li>
                <Link to='/'>Main</Link>
              </li>
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
              <li>
                {!loading && (
                  <>
                    {isAuthenticated ? (
                      <div
                        onClick={logout}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        Logout
                      </div>
                    ) : (
                      <Link to='/login'>Login</Link>
                    )}{' '}
                  </>
                )}
              </li>
              <li onClick={toggleEditing}>
                {!loading && (
                  <>
                    {isAuthenticated &&
                      (isEditing ? (
                        <Link to='/'> Stop Editing </Link>
                      ) : (
                        <Link to='/editing'>Edit</Link>
                      ))}
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
