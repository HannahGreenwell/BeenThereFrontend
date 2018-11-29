import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

class BeenThereMap extends Component {

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
      <GoogleMap
        defaultCenter={{lat: 22.375140, lng: 91.797224}}
        defaultZoom={3}
        onClick={this.handleMapClick}
      >
      {
        pins.map(pin =>
          <Marker
            position={{lat: pin.lat, lng: pin.lng,}}
            key={`${pin.name}`}
            onClick={() => onClick(pin.city, pin.name)}
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
    );
  }
};

export default withGoogleMap(BeenThereMap);
