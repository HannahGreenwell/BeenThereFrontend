import React, {Component} from 'react';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS;

class GoogleSuggest extends Component {
  constructor() {
    super();
  }



  handleSelectSuggest(geocodedPrediction, originalPrediction) {
    console.log('SELECTED:', geocodedPrediction, originalPrediction);
    this.setState({
      search: '',
      value: originalPrediction.description,
      placeData: {
        geocodedPrediction,
        originalPrediction
      }
    });
  }

  render() {
    const {search, value} = this.props;

    return (
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
              textNoResults="My custom no results text"
              customRender={prediction => (
                <div className="customWrapper">
                  {
                    prediction
                      ? prediction.description
                      : "My custom no results text"
                  }
                </div>
              )}
            >
              <input
                type="text"
                placeholder="Search for a place"
                onChange={this.props.handleInputChange}
              />
            </ReactGooglePlacesSuggest>
          )
        }
      />
    );
  }
}

export default GoogleSuggest;
