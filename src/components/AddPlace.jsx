import React, {Component} from 'react';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';

import AddPlaceForm from './AddPlaceForm';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS;

class AddPlace extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      value: '',
      placeData: {
        geocodedPrediction: {},
        originalPrediction: {},
      },
      showAddPlaceForm: false,
    };
  }

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({
      search: event.target.value,
      value: event.target.value
    });
  }

  handleSelectSuggest(geocodedPrediction, originalPrediction) {
    console.log('SELECTED:', geocodedPrediction, originalPrediction);
    this.setState({
      search: '',
      value: originalPrediction.description,
      placeData: {
        geocodedPrediction,
        originalPrediction
      },
      showAddPlaceForm: true,
    });
  }

  handleFocus() {
    this.setState({showAddPlaceForm: false});
  }

  render() {
    const {search, value, placeData, showAddPlaceForm} = this.state;

    return (
      <div>
        <ReactGoogleMapLoader
          params={{
            key: API_KEY,
            libraries: 'places, geocode',
          }}
          render={googleMaps =>
            googleMaps && (
              <ReactGooglePlacesSuggest
                googleMaps={googleMaps}
                autocompletionRequest={{
                  input: search,
                }}
                onSelectSuggest={(geocodedPrediction, originalPrediction) => this.handleSelectSuggest(geocodedPrediction, originalPrediction)}
                textNoResults="Sorry, place not found"
                customRender={prediction => (
                  <div className="customWrapper">
                    {
                      prediction
                        ? prediction.description
                        : "Sorry, place not found"
                    }
                  </div>
                )}
              >
                <input
                  type="text"
                  value={value}
                  placeholder="Search for a place"
                  onChange={(event) => this.handleInputChange(event)}
                  onFocus={() => this.handleFocus()}
                />
              </ReactGooglePlacesSuggest>
            )
          }
        />

        {
          showAddPlaceForm  &&
          <AddPlaceForm
            placeData={placeData}
            onSubmit={this.props.onSubmit}
          />
        }
      </div>
    );
  }
}

export default AddPlace;
