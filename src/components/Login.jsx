import React, {Component} from 'react';
import axios from 'axios';

import HeaderProtected from './HeaderProtected';
import './LoginSignup.css';

const URL = '/user';
// const URL = 'http://www.localhost:3000/user';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      passwordInput: '',
      error: ''
    };
  }

  componentDidMount() {
    if(this.props.location.state) {
      this.setState({error: this.props.location.state.message});
    }
  }

  handleEmailChange(event) {
    this.setState({emailInput: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({passwordInput: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(`${URL}/signin`,
      {
        email: this.state.emailInput,
        password: this.state.passwordInput
      }
    )
    .then(response => {
      console.log('RESPONSE: ', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Store the JWT token in the browser's localStorage system
      if('localStorage' in window) {
        localStorage.setItem('authToken', response.data.token);
      }

      // 'Redirect' to the user's Been There map
      this.props.history.push(`/`);
    })
    .catch( error => {
      // Need to display error message on page
      console.dir(error.response.data.message);
      this.setState({error: error.response.data.message});
    });
  }

  handleSignupClick(event) {
    event.preventDefault();
    this.props.history.push(`/signup`);
  }

  render() {
    return (
      <div className="login-container">
        <HeaderProtected onClick={ev => this.handleSignupClick(ev)} />

        <div className="login-box">
          <h2>Login</h2>

          <form onSubmit={ev => this.handleSubmit(ev)}>
            <div>
              <label>Email</label>
              <input type="email" value={this.state.emailInput} onChange={ev => this.handleEmailChange(ev)} />
            </div>

            <div>
              <label>Password</label>
              <input type="password" value={this.state.passwordInput} onChange={ev => this.handlePasswordChange(ev)} />
            </div>

            <input type="submit" value="Login" />
          </form>

          <p className="error-msg">{this.state.error}</p>
        </div>
      </div>
    );
  }
}

export default Login;
