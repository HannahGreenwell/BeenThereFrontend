import React, {Component} from 'react';
import axios from 'axios';

import Header from './Header';
import './LoginSignup.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      passwordInput: '',
      error: ''
    };
  }

  handleEmailChange(event) {
    console.log(event.target.value);
    this.setState({emailInput: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({passwordInput: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3000/user/signin',
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

  render() {
    return (
      <div className="login-container">
        <Header />

        <div className="login">
          <h2>Login</h2>

        <form onSubmit={ev => this.handleSubmit(ev)}>
          <div>
            <label>Email</label>
            <input type="email" value={this.state.emailInput} onChange={ev => this.handleEmailChange(ev)} />
          </div>
           
          Password: <input type="password" value={this.state.passwordInput} onChange={ev => this.handlePasswordChange(ev)} /><br />
            <input type="submit" value="Login" /><br />
          </form>

        </div>
      </div>
    );
  }
}

export default Login;
