import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import BrandLogo from '../resources/images/bemo-logo2.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

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
                <Link to='/editing'>Edit</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
