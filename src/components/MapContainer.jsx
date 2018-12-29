import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Map from './Map';

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

  render() {

    const {places, onClick} = this.props;

    return (
      <div className="map">

        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,drawing,places`}
          loadingElement={<div style={{height: '100%'}} />}
          containerElement={<div style={{height: '90vh', width: '100vw'}} />}
          mapElement={<div style={{height: '100%'}} />}
          onClick={onClick}
          places={places}
        />

      </div>
    );
  }
}

MapContainer.propTypes = {
  places: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

MapContainer.defaultProps = {
  places: [],
}

export default MapContainer;
