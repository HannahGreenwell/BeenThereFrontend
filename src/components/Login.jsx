import React, {Component} from 'react';
import axios from 'axios';

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
      <div>
        <h2>Login</h2>
        <form onSubmit={ev => this.handleSubmit(ev)}>
          Email: <input type="text" onChange={ev => this.handleEmailChange(ev)} /><br />
          Password: <input type="password" onChange={ev => this.handlePasswordChange(ev)} /><br />
          <input type="submit" value="Login" /><br />
        </form>
      </div>
    );
  }
}

export default Login;