import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

function Header(props) {

  const {onClick} = props;

  return (
    <div className="header">
      <h1>Been There</h1>

      <nav className="main-nav">
        <ul>
          <li><span className="yellow-bg">Account</span></li>
          <li>
            <span
            className="yellow-bg"
            onClick={onClick}
            >
            Sign Out
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Header;
