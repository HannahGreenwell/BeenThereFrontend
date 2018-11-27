import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import BeenThereMap from './components/BeenThereMap';
import SideBar from './components/SideBar';


class App extends Component {

  constructor() {
    super();

    this.state = {
      pins: [],
    };
  }

  componentWillMount() {
    if('localStorage' in window) {
      const jwt = localStorage.getItem('authToken');

      if(jwt) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      } else {
        this.props.history.push('/login');
      }

      this.fetchPins();
    }
  }

  fetchPins() {
    const url = `http://localhost:3000/user/beenthere`;

    axios.get(url)
    .then(response => {
      console.log('DATA:', response);
      this.setState({pins: response.data})
    })
    .catch(console.warn);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="main-container">
          <SideBar />
          <BeenThereMap pins={this.state.pins} />
        </div>
      </div>
    );
  }
}

export default App;
