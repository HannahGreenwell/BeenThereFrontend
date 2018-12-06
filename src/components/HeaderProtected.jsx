import React, {Component} from 'react';

import './Header.css';

class HeaderProtected extends Component {
  render() {
    return (
      <div className="header">
        <h1>Been There</h1>

        <nav className="main-nav">
          <ul>
            <li>
              <span
              className="yellow-bg"
              onClick={this.props.onClick}
              >
              Login
              </span>
            </li>
            <li>
              <span
              className="yellow-bg"
              onClick={this.props.onClick}
              >
              Sign Up
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default HeaderProtected;
