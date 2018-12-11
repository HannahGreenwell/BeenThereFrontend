import React, {Component} from 'react';
import axios from 'axios';

import HeaderProtected from './HeaderProtected';
import './LoginSignup.css';

// const URL = '/user';
const URL = 'http://www.localhost:3000/user';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      passwordInput: '',
      error: ''
    };
  }

  // Save any error messages into state
  componentDidMount() {
    if(this.props.location.state) {
      this.setState({error: this.props.location.state.message});
    }
  }

  // Handle email field input
  handleEmailChange(event) {
    this.setState({emailInput: event.target.value});
  }

  // Handle password field input
  handlePasswordChange(event) {
    this.setState({passwordInput: event.target.value});
  }

  // Login button submit handler
  handleSubmit(event) {
    event.preventDefault();
    // Make an axios post request to the backend to signin
    axios.post(`${URL}/signin`,
      {
        email: this.state.emailInput,
        password: this.state.passwordInput
      }
    )
    .then(response => {
      // If the signin was successful, save the returned JWT into the authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Store the JWT token in the browser's localStorage system
      if('localStorage' in window) {
        localStorage.setItem('authToken', response.data.token);
      }

      // 'Redirect' to the user's Been There map
      this.props.history.push(`/`);
    })
    .catch( error => {
      // Save any errors into state
      this.setState({error: error.response.data.message});
    });
  }

  // Sign Up link click handler
  handleSignupClick(event) {
    event.preventDefault();
    // Redirect to sign up page
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
