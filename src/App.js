import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header/Header';
import MapContainer from './components/Map/MapContainer';
import SideBar from './components/Sidebar/SideBar';
import Modal from './components/Modal';

const URL = 'http://www.localhost:3000/user';
// const URL = '/user';

class App extends Component {

  constructor() {
    super();

    this.state = {
      places: [],
      selectedPlace: {},
      showModal: false,
      formType: 'add'
    };
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
  fetchPlaces = () => {
    axios.get(`${URL}/places`)
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
  handleSignOut = () => {
    // Remove JWT from localStorage
    localStorage.removeItem('authToken');
    // Redirect to sign-in page
    this.props.history.push('/signin');
  }

  // Display/hide the modal
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  // Read Place Details
  handlePlaceClick = (lat, lng) => {
    const {places} = this.state;
    const clickedPlace = places.find(place => place.lat === lat && place.lng);

    this.setState({
      selectedPlace: clickedPlace,
    });
  }

  // Create Place
  handleAddPlaceSubmit = formData => {
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

  // Edit Place
  handleEditPlaceClick = () => {
    this.setState({
      formType: 'edit',
      showModal: true
    });
  }

  // Update Place
  handleEditPlaceSubmit = formData => {
    const {lat, lng} = this.state.selectedPlace;

    axios.put(`${URL}/place/${lat}/${lng}`, formData)
    .then(response => {
      const updatedPlaces = this.state.places.filter(p => p.lat !== lat && p.lng !== lng);
      const updatedPlace = response.data;

      this.setState({
        places: [...updatedPlaces, updatedPlace],
        selectedPlace: updatedPlace,
        showModal: false
      });
    })
    .catch(console.warn);
  }

  // Delete Place
  handleDeletePlaceClick = () => {
    const {lat, lng} = this.state.selectedPlace;

    axios.delete(`${URL}/place/${lat}/${lng}`)
    .then(response => {
      const updatedPlaces = this.state.places.filter(p => p.lat !== lat && p.lng !== lng);
      this.setState({
        places: updatedPlaces,
        selectedPlace: {}
      });
    })
    .catch(console.warn);
  }

  render() {

    const {places, selectedPlace, showModal, formType} = this.state;

    return (
      <div className="App">

        <Header onClick={this.handleSignOut}/>

        <div className="main-container">
          <SideBar
            place={selectedPlace}
            onDeleteClick={this.handleDeletePlaceClick}
            onEditClick={this.handleEditPlaceClick}
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

        <Modal
          show={showModal}
          formType={formType}
          selectedPlace={selectedPlace}
          closeCallBack={this.toggleModal}
          onAddPlaceSubmit={this.handleAddPlaceSubmit}
          onEditPlaceSubmit={this.handleEditPlaceSubmit}
        />
      </div>
    );
  }
}

export default App;
