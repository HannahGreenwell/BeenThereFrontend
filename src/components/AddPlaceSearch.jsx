import React, {Component} from 'react';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';

import AddPlaceForm from './AddPlaceForm';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS;

class AddPlaceSearch extends Component {
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

  // Handle Google Places Suggest text field input
  handleInputChange(event) {
    this.setState({
      search: event.target.value,
      value: event.target.value
    });
  }

  // Handle click on Google Places dropdown suggestion
  handleSelectSuggest(geocodedPrediction, originalPrediction) {
    console.log('SELECTED:', geocodedPrediction, originalPrediction);
    // Save the Google Place data into state and update showAddPlaceForm to true
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

  // Hide the add place form if the user clicks back into the Google Places Suggest field
  handleFocus() {
    this.setState({showAddPlaceForm: false});
  }

  render() {
    const {search, value, placeData, showAddPlaceForm} = this.state;

    return (
      <div>

        <ReactGooglePlacesSuggest
          googleMaps={window.google.maps}
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

export default AddPlaceSearch;
