import React, {Component} from 'react';

import './Header.css';

class HeaderProtected extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLogin: this.props.isLogin
    });
  }

  render() {
    return (
      <div className="header">
        <h1>Been There</h1>

        <nav className="main-nav">
          <ul>
            <li>
              <span
              className="yellow-bg"
              >
                {
                  this.state.isLogin ? "Sign Up" : "Login"
                }
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default HeaderProtected;
