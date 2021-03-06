import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header/Header';
import MapContainer from './components/Map/MapContainer';
import SideBar from './components/Sidebar/SideBar';
import Modal from './components/Modal';
import AddPlaceSearch from './components/AddPlaceSearch'
import AddPlaceForm from './components/AddPlaceForm'
import EditPlaceForm from './components/EditPlaceForm'
import DeletePlaceConfirm from './components/DeletePlaceConfirm'
import LoadingModal from './components/LoadingModal'


const BASE_URL = 'http://www.localhost:3000';
// const BASE_URL = '';
// const URL = '/user';

class App extends Component {

  constructor() {
    super();

    this.state = {
      places: [],
      selectedPlace: {},
      showSearchModal: false,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showLoadingModal: false,
      placeData: {
        geocodedPrediction: {},
        originalPrediction: {},
      }
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
    axios.get(`${BASE_URL}/map/places`)
    .then(response => {
      // Save the returned pins array into state
      // Note: users with no pins will return an empty array
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

  closeModal = () => {
    this.setState({
      showSearchModal: false,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showLoadingModal: false
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

  // New Place
  handleAddPlaceClick = () => {
    this.setState({
      showSearchModal: true,
    });
  }

  handleSearchPlaceChange = (geocodedPrediction, originalPrediction) => {
    this.setState({
      showSearchModal: false,
      showAddModal: true,
      placeData: {
        geocodedPrediction,
        originalPrediction
      }
    });
  }

  // Create Place
  handleAddPlaceSubmit = formData => {
    this.setState({
      showAddModal: false,
      showLoadingModal: true
    });

    // Make axios post request to backend to create new place
    axios.post(`${BASE_URL}/map/place`, formData)
    .then(response => {
      const place = response.data;
      // Set the returned place into state and hide the modal
      this.setState({
        places: [...this.state.places, place],
        selectedPlace: place,
        showLoadingModal: false
      })
    })
    .catch(console.warn);
  }

  // Edit Place
  handleEditPlaceClick = () => {
    this.setState({
      showEditModal: true
    });
  }

  // Update Place
  handleEditPlaceSubmit = formData => {
    this.setState({
      showEditModal: false,
      showLoadingModal: true
    });

    const {lat, lng} = this.state.selectedPlace;

    axios.put(`${BASE_URL}/map/place/${lat}/${lng}`, formData)
    .then(response => {
      const updatedPlaces = this.state.places.filter(p => p.lat !== lat && p.lng !== lng);
      const updatedPlace = response.data;

      this.setState({
        places: [...updatedPlaces, updatedPlace],
        selectedPlace: updatedPlace,
        showLoadingModal: false
      });
    })
    .catch(console.warn);
  }

  handleDeletePlaceClick = () => {
    this.setState({
      showDeleteModal: true
    });
  }

  // Delete Place
  handleDeletePlaceConfirm = () => {
    const {lat, lng} = this.state.selectedPlace;

    axios.delete(`${BASE_URL}/map/place/${lat}/${lng}`)
    .then(response => {
      const updatedPlaces = this.state.places.filter(p => p.lat !== lat && p.lng !== lng);
      this.setState({
        places: updatedPlaces,
        selectedPlace: {},
        showDeleteModal: false
      });
    })
    .catch(console.warn);
  }

  render() {

    const {
      places,
      selectedPlace,
      showSearchModal,
      showAddModal,
      showEditModal,
      showDeleteModal,
      showLoadingModal,
      placeData
    } = this.state;

    return (
      <div className="App">

        <Header onClick={this.handleSignOut}/>

        <div className="main-container">
          <SideBar
            place={selectedPlace}
            onEditClick={this.handleEditPlaceClick}
            onDeleteClick={this.handleDeletePlaceClick}
          />

          <MapContainer
            places={places}
            onClick={this.handlePlaceClick}
          />
        </div>

        <button
          className="add-place-btn"
          onClick={this.handleAddPlaceClick}
        >
          <i className="material-icons">
            add_location
          </i>
        </button>

        {
          showSearchModal &&
          <Modal
            closeModal={this.closeModal}
          >
            <AddPlaceSearch
              onChange={this.handleSearchPlaceChange}
            />
          </Modal>
        }

        {
          showAddModal &&
          <Modal
            closeModal={this.closeModal}
          >
            <AddPlaceForm
              placeData={placeData}
              onSubmit={this.handleAddPlaceSubmit}
            />
          </Modal>
        }

        {
          showEditModal &&
          <Modal
            closeModal={this.closeModal}
          >
            <EditPlaceForm
              selectedPlace={selectedPlace}
              onSubmit={this.handleEditPlaceSubmit}
            />
          </Modal>
        }

        {
          showDeleteModal &&
          <Modal
            closeModal={this.closeModal}
          >
            <DeletePlaceConfirm
              selectedPlace={selectedPlace}
              onClick={this.handleDeletePlaceConfirm}
              closeModal={this.closeModal}
            />
          </Modal>
        }

        {
          showLoadingModal &&
          <Modal
            closeModal={this.closeModal}
          >
            <LoadingModal />
          </Modal>
        }
      </div>
    );
  }
}

export default App;
