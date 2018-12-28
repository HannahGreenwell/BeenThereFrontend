import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import MapContainer from './components/MapContainer';
import SideBar from './components/SideBar';
import AddPlaceModal from './components/AddPlaceModal';

const URL = 'http://www.localhost:3000/user';
// const URL = '/user';

class App extends Component {

  constructor() {
    super();

    this.state = {
      pins: [],
      selectedPin: {},
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handlePinClick = this.handlePinClick.bind(this);
    this.handleDeletePlaceClick = this.handleDeletePlaceClick.bind(this);
    this.handleAddPlaceSubmit = this.handleAddPlaceSubmit.bind(this);
  }

  componentWillMount() {
    // Handle users entering the site NOT through the login page
    if('localStorage' in window) {
      // Get JWT from localStorage
      const jwt = localStorage.getItem('authToken');

      // Check whether the user has a JWT
      if(jwt) {
        // If the user has a JWT, set the token in the authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      } else {
        // If the user does not have a JWT, redirect to the login page
        this.props.history.push({
          pathname: '/login',
          // state: {message: 'Please login to access that page'}
        });
      }

      // Fetch the user's saved places
      this.fetchPins();
    }
  }

  // Makes an axios request to the backend for the user's saved places
  fetchPins() {
    axios.get(`${URL}/beenthere`)
    .then(response => {
      // Save the returned pins array into state
      // Note: user's with no pins will return an empty array
      this.setState({pins: response.data});
    })
    .catch(error => {
      // If an (authorization) error occurs, redirect to the login page
      this.props.history.push({
        pathname: '/login',
        // state: {message: 'Please login to access that page'}
      });
    });
  }

  // Display/hide the modal
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  // Sign out
  handleSignOut() {
    // Remove JWT from localStorage
    localStorage.removeItem('authToken');
    // Redirect to login page
    this.props.history.push('/login');
  }

  // Click handler for map pins
  handlePinClick(city, name) {
    // Make an axios request to the backend for the clicked pin's details
    axios.get(`${URL}/pin/${city}/${name}`)
    .then(response => {
      // Set the pin's details into state
      this.setState({
        selectedPin: response.data,
      });
    })
    .catch(console.warn);
  }

  // Click handler for delete place button
  handleDeletePlaceClick(){
    console.log('CLICKED!');
  }

  // Submit handler for add new place form
  handleAddPlaceSubmit(formData) {
    // Make axios post request to backend to create new place
    axios.post(`${URL}/pin`, formData)
    .then(response => {
      console.log(response);
      // Set the returned pin and pin details into state
      this.setState({
        pins: [...this.state.pins, response.data.pinToPush],
        selectedPin: response.data.newPin,
        showModal: false,
      })
    })
    .catch(console.warn);
  }

  render() {
    return (
      <div className="App">

        <Header onClick={this.handleSignOut}/>

        <div className="main-container">
          <SideBar
            pin={this.state.selectedPin}
            pinAdded={this.state.wasPinAdded}
            onClick={this.handleDeletePlaceClick}
          />

          <MapContainer
            pins={this.state.pins}
            onClick={this.handlePinClick}
          />
        </div>

        <button
          className="add-place-btn"
          onClick={this.toggleModal}
        >
          <i className="material-icons">
            add_location
          </i>
        </button>

        <AddPlaceModal
          show={this.state.showModal}
          closeCallBack={this.toggleModal}
          onSubmit={this.handleAddPlaceSubmit}
        />
      </div>
    );
  }
}

export default App;
