import React, {Component} from 'react';

import BeenThereMap from './BeenThereMap';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS;

class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLatLng: {
        lat: -33.870937,
        lng: 151.204588
      },
    };
  }

  // componentDidMount() {
  //   this.getGeoLocation();
  // }

  // Get the user's current location and update state
  // getGeoLocation = () => {
  //   if(navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition( position => {
  //       this.setState( prevState => ({
  //         currentLatLng: {
  //           ...prevState.currentLatLng,
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude
  //         },
  //         isMarkerShown: true
  //       }))
  //     })
  //   } else {
  //     console.warn('Whoops an error occured');
  //   }
  // }

  render() {
    const {pins, onClick} = this.props;

    return (
      <div className="map">
        <BeenThereMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,drawing,places`}
          loadingElement={<div style={{height: '100%'}} />}
          containerElement={<div style={{height: '90vh', width: '100vw'}} />}
          mapElement={<div style={{height: '100%'}} />}
          onClick={onClick}
          pins={pins}
        />
      </div>
    );
  }
};

export default MapContainer;
