import React, {Component} from 'react';
import axios from 'axios';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS;

class BeenThereMap extends Component {

  constructor() {
    super();

    this.state = {
      mapData: [],
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false
    };
  }

  componentDidMount() {
    this.getGeoLocation();
    this.fetchMapData(this.props.match.params.id);
  }

  // https://stackoverflow.com/questions/50766080/geolocation-in-react-use-react-google-maps
  getGeoLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        this.setState( prevState => ({
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          isMarkerShown: true
        }))
      })
    } else {
      console.warn('Whoops an error occured');
    }
  }

  fetchMapData(id) {
    const url = `http://localhost:3000/beenthere/${id}`;

    axios.get(url)
    .then(response => {
      this.setState({mapData: response.data})
    })
    .catch(console.warn);
  }

  render() {

    const BeenThereMap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        center = {{lat: this.state.currentLatLng.lat, lng: this.state.currentLatLng.lng}}
        defaultZoom = {5}
      >

        {
          this.state.mapData.map(city => {
            return (
              city.pins.map(pin => <Marker position={{lat: pin.lat, lng: pin.lng,}} key={`${pin.lat}${pin.lng}`} />)
            );
          })
        }

      </GoogleMap>
    )));

    return (
      <div>
        <BeenThereMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,drawing,places`}
          loadingElement={<div style={{height: '100%'}} />}
          containerElement={<div style={{height: '100vh', width: '100vw'}} />}
          mapElement={<div style={{height: '100%'}} />}
        />
      </div>
    );
  }
};

export default BeenThereMap;
