import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';

function HeaderProtected(props) {

  return (
    <div className="header">
      <h1>Been There</h1>

      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/login">
              <span
              className="yellow-bg"
              onClick={props.onClick}
              >
              Login
              </span>
            </Link>
          </li>

          <li>
            <Link to="/signup">
              <span
              className="yellow-bg"
              onClick={props.onClick}
              >
              Sign Up
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderProtected;
