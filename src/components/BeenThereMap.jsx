import React from 'react';
import PropTypes from 'prop-types';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

function Map(props) {

  const {places, onClick} = props;

  return (
    <GoogleMap
      defaultCenter={{lat: 22.375140, lng: 91.797224}}
      defaultZoom={3}
    >

    {
      places.map(place =>
        <Marker
          position={{lat: place.lat, lng: place.lng,}}
          key={`${place.name}`}
          onClick={() => onClick(place.city, place.name)}
        >

          <InfoWindow>
            <div>
              {place.name}
            </div>
          </InfoWindow>

        </Marker>
      )
    }

    </GoogleMap>
  );
}

Map.propTypes = {
  places: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

Map.defaultProps = {
  places: [],
};


export default withGoogleMap(Map);
