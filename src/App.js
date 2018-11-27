import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import BeenThereMap from './components/BeenThereMap';
import SideBar from './components/SideBar';


class App extends Component {


  componentWillMount() {
    if('localStorage' in window) {
      const jwt = localStorage.getItem('authToken');

      if(jwt) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      } else {
        this.props.history.push('/login');
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="main-container">
          <SideBar />
          <BeenThereMap />
        </div>
      </div>
    );
  }
}

export default App;
