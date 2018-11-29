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
      wasPinAdded: false,
    };
  }

  componentWillMount() {
    if('localStorage' in window) {
      const jwt = localStorage.getItem('authToken');

      if(jwt) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      } else {
        this.props.history.push({
          pathname: '/login',
          state: {message: 'Please login to access that page'}
        });
      }

      this.fetchPins();
    }
  }

  fetchPins() {
    axios.get(`${URL}/beenthere`)
    .then(response => {
      this.setState({pins: response.data});
    })
    .catch(error => {
      this.props.history.push({
        pathname: '/login',
        state: {
          message: 'Please login again',
          error
        }
      });
    });
  }

  handleSignOut() {
    localStorage.removeItem('authToken');
    this.props.history.push('/login');
  }

  handleMarkerClick(city, name) {
    axios.get(`${URL}/pin/${city}/${name}`)
    .then(response => {
      console.log('PIN:', response);
      this.setState({
        selectedPin: response.data,
      });
    })
    .catch(console.warn);
  }

  handleAddMarkerSubmit(ev, name, category, description, images, lat, lng, city) {
    ev.preventDefault();
    axios.post(`${URL}/pin`, {
      name,
      category,
      description,
      images,
      lat,
      lng,
      city
    })
    .then(response => {
      this.setState({
        pins: [...this.state.pins, response.data.pinToPush],
        selectedPin: response.data.newPin,
        wasPinAdded: true,
      })
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
            pinAdded={this.state.wasPinAdded}
            onSubmit={(ev, name, category, description, images, lat, lng, city) => this.handleAddMarkerSubmit(ev, name, category, description, images, lat, lng, city)}
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
