import React, {Component} from 'react';
import axios from 'axios';

import HeaderProtected from '../Header/HeaderProtected';
import './Signin.css';

const BASE_URL = 'http://www.localhost:3000';
// const BASE_URL = '';

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  // Sign up button submit handler
  handleSubmit = event => {
    event.preventDefault();
    const {email, password} = this.state;

    // Make an axios post request to the backend to sign up
    axios.post(`${BASE_URL}/user/signup`, {email, password})
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

    const {email, password, error} = this.state;

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
                name="email"
                value={email}
                onChange={this.handleChange} />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange} />
            </div>

            <input type="submit" value="Sign Up" />
          </form>

          <p className="error-msg">{error}</p>
        </div>
      </div>
    );
  }
}

export default Signup;
