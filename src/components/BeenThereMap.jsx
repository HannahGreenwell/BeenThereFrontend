import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

class BeenThereMap extends Component {

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
