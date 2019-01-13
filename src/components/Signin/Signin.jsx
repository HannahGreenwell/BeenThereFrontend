import React, {Component} from 'react';
import axios from 'axios';

import HeaderProtected from '../Header/HeaderProtected';

import './Signin.css';

const BASE_URL = 'http://www.localhost:3000';
// const BASE_URL = '';

class Signin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  // Save any error messages into state
  componentDidMount() {
    if (this.props.location.state) {
      this.setState({error: this.props.location.state.message});
    }
  }

  handleChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  // Sign-in button submit handler
  handleSubmit = event => {
    event.preventDefault();
    const {email, password} = this.state;

    // Make an axios post request to the backend to signin
    axios.post(`${BASE_URL}/user/signin`, {email, password})
    .then(response => {
      // If the sign-in was successful, save the returned JWT into the authorization header
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

  render() {

    const {email, password, error} = this.state;

    return (
      <div className="login-container">
        <HeaderProtected />

        <div className="login-box">
          <h2>Sign In</h2>

          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={ this.handleChange}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>

            <input type="submit" value="Sign In" />
          </form>

          <p className="error-msg">{error}</p>
        </div>
      </div>
    );
  }
}

export default Signin;
