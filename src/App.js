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
      places: [],
      selectedPlace: {},
      showModal: false,
    };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handlePlaceClick = this.handlePlaceClick.bind(this);
    this.handleDeletePlaceClick = this.handleDeletePlaceClick.bind(this);
    this.handleAddPlaceSubmit = this.handleAddPlaceSubmit.bind(this);
  }

  componentWillMount() {
    // Handle users entering the site NOT through the sign-in page
    if('localStorage' in window) {
      // Get JWT from localStorage
      const jwt = localStorage.getItem('authToken');

      // Check whether the user has a JWT
      if(jwt) {
        // If the user has a JWT, set the token in the authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      } else {
        // If the user does not have a JWT, redirect to the sign-in page
        this.props.history.push({
          pathname: '/signin',
          // state: {message: 'Please sign in to access that page'}
        });
      }

      // Fetch the user's saved places
      this.fetchPlaces();
    }
  }

  // Makes an axios request to the backend for the user's saved places
  fetchPlaces() {
    axios.get(`${URL}/map`)
    .then(response => {
      // Save the returned pins array into state
      // Note: user's with no pins will return an empty array
      this.setState({places: response.data});
    })
    .catch(error => {
      // If an (authorization) error occurs, redirect to the sign-in page
      this.props.history.push({
        pathname: '/signin',
        // state: {message: 'Please sign in to access that page'}
      });
    });
  }

  // Sign out
  handleSignOut() {
    // Remove JWT from localStorage
    localStorage.removeItem('authToken');
    // Redirect to sign-in page
    this.props.history.push('/signin');
  }

  // Display/hide the modal
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  // Click handler for map pins
  handlePlaceClick(lat, lng) {
    const {places} = this.state;
    const clickedPlace = places.find(place => place.lat === lat && place.lng);

    this.setState({
      selectedPlace: clickedPlace,
    });
  }

  // Click handler for delete place button
  handleDeletePlaceClick() {
    const {lat, lng} = this.state.selectedPlace;

    axios.delete(`${URL}/place/${lat}/${lng}`)
    .then(response => {
      this.setState({
        places: response.data,
        selectedPlace: {}
      });
    })
    .catch(console.warn);
  }

  // Submit handler for add new place form
  handleAddPlaceSubmit(formData) {
    // Make axios post request to backend to create new place
    axios.post(`${URL}/place`, formData)
    .then(response => {
      const place = response.data;
      // Set the returned place into state and hide the modal
      this.setState({
        places: [...this.state.places, place],
        selectedPlace: place,
        showModal: false,
      })
    })
    .catch(console.warn);
  }

  render() {

    const {places, selectedPlace, showModal} = this.state;

    return (
      <div className="App">

        <Header onClick={this.handleSignOut}/>

        <div className="main-container">
          <SideBar
            place={selectedPlace}
            onClick={this.handleDeletePlaceClick}
          />

          <MapContainer
            places={places}
            onClick={this.handlePlaceClick}
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
          show={showModal}
          closeCallBack={this.toggleModal}
          onSubmit={this.handleAddPlaceSubmit}
        />
      </div>
    );
  }
}

export default App;
