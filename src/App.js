import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import MapContainer from './components/MapContainer';
import SideBar from './components/SideBar';

const URL = `http://localhost:3000/user`;

class App extends Component {

  constructor() {
    super();

    this.state = {
      pins: [],
      selectedPin: {},
      showInstructions: true,
      showPinDetail: false,
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
    axios.get(`${URL}/beenthere`)
    .then(response => {
      // console.log('PINS:', response);
      this.setState({pins: response.data});
    })
    .catch(console.warn);
  }

  handleSignOut() {
    localStorage.removeItem('authToken');
    this.props.history.push('/login');
  }

  handleMarkerClick(city, name) {
    console.log('clicked', city, name);
    axios.get(`${URL}/pin/${city}/${name}`)
    .then(response => {
      console.log('PIN:', response);
      this.setState({
        selectedPin: response.data,
        showInstructions: false,
        showPinDetail: true
      });
    })
    .catch(console.warn);
  }

  render() {
    return (
      <div className="App">
        <Header onClick={() => this.handleSignOut()}/>

        <div className="main-container">
          <SideBar
            pin={this.state.selectedPin}
            showInstructions={this.state.showInstructions}
            showPinDetail={this.state.showPinDetail}
          />

        <MapContainer
            pins={this.state.pins}
            onClick={(city, name) => this.handleMarkerClick(city, name)}
          />
        </div>
      </div>
    );
  }
}

export default App;
