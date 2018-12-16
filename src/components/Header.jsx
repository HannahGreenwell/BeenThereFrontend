import React from 'react';

import './Header.css';

function Header(props) {

  return (
    <div className="header">
      <h1>Been There</h1>

      <nav className="main-nav">
        <ul>
          <li><span className="yellow-bg">About</span></li>
          <li><span className="yellow-bg">Account</span></li>
          <li>
            <span
            className="yellow-bg"
            onClick={props.onClick}
            >
            Sign Out
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
