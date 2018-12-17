import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
}

MapContainer.propTypes = {
  pins: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

MapContainer.defaultProps = {
  pins: [],
}

export default MapContainer;
