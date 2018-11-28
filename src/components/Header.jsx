import React, {Component} from 'react';

import './Header.css';

class Header extends Component {

  render() {
    return (
      <div className="header">
        <h1>Been There</h1>

        <nav className="main-nav">
          <ol>
            <li><span className="yellow-bg">About</span></li>
            <li><span className="yellow-bg">Account</span></li>
            <li>
              <span
              className="yellow-bg"
              onClick={this.props.onClick}
              >
              Sign Out
            </span>
          </li>
          </ol>
        </nav>
      </div>
    );
  }
}

export default Header;
