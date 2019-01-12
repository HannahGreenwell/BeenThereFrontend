import React, {Component} from 'react';
import axios from 'axios';

import HeaderProtected from '../Header/HeaderProtected';
import './Signin.css';

const BASE_URL = 'http://www.localhost:3000';
// const BASE_URL = '';
// const URL = '/user';

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
      passwordInput: '',
      error: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle email field input
  handleEmailChange(event) {
    this.setState({emailInput: event.target.value});
  }

  // Handle password field input\
  handlePasswordChange(event) {
    this.setState({passwordInput: event.target.value});
  }

  // Sign up button submit handler
  handleSubmit(event) {
    event.preventDefault();

    // Make an axios post request to the backend to sign up
    axios.post(`${BASE_URL}/user/signup`,
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
      // Save any errors to state
      this.setState({error: error.response.data.message});
    });
  }

  render() {
    return (
      <div className="login-container">
        <HeaderProtected />

        <div className="login-box">
          <h2>Sign Up</h2>

          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={this.state.emailInput}
                onChange={this.handleEmailChange} />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                value={this.state.passwordInput}
                onChange={this.handlePasswordChange} />
            </div>

            <input type="submit" value="Sign Up" />
          </form>

          <p className="error-msg">{this.state.error}</p>
        </div>
      </div>
    );
  }
}

export default Signup;
