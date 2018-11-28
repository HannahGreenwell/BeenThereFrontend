import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS;

class BeenThereMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLatLng: {
        lat: -33.870937,
        lng: 151.204588
      },
      // isMarkerShown: false
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

  handleMapClick(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    console.log(lat, lng);
  }

  render() {
    const BeenThereMap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        center={{lat: this.state.currentLatLng.lat, lng: this.state.currentLatLng.lng}}
        defaultZoom={2.5}
        onClick={this.handleMapClick}
      >
      {
        this.props.pins.map(pin =>
          <Marker
            position={{lat: pin.lat, lng: pin.lng,}}
            key={`${pin.name}`}
            onClick={() => this.props.onClick(pin.city, pin.name)}
          >
            <InfoWindow>
              <div>
                {pin.name}
              </div>
            </InfoWindow>
          </Marker>
        )
      }
      </GoogleMap>
    )));

    return (
      <div className="map">
        <BeenThereMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,drawing,places`}
          loadingElement={<div style={{height: '100%'}} />}
          containerElement={<div style={{height: '90vh', width: '100vw'}} />}
          mapElement={<div style={{height: '100%'}} />}
        />
      </div>
    );
  }
};

export default BeenThereMap;
