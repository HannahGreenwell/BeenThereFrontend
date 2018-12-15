import React from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

function BeenThereMap(props) {

  const {pins, onClick} = props;

  return (
    <GoogleMap
      defaultCenter={{lat: 22.375140, lng: 91.797224}}
      defaultZoom={3}
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
};

export default withGoogleMap(BeenThereMap);
