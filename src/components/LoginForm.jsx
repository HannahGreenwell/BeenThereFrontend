import React, {Component} from 'react';
import axios from 'axios';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      passwordInput: ''
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
    axios.post('http://localhost:3000/login',
      {
        name: this.state.emailInput,
        password: this.state.passwordInput
      }
    )
    .then(response => {
      console.log('RESPONSE: ', response.data);
    })
    .catch( error => {
      // Need to display error message on page
      console.dir(error.response.data);
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

export default LoginForm;
