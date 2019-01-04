import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';

import AddPlaceForm from './AddPlaceForm';

class AddPlaceSearch extends Component {

  constructor(props) {
    super(props);

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
  handleInputChange = event => {
    this.setState({
      search: event.target.value,
      value: event.target.value
    });
  }

  // Handle click on Google Places dropdown suggestion
  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    // console.log('SELECTED:', geocodedPrediction, originalPrediction);
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
  handleFocus = () => {
    this.setState({showAddPlaceForm: false});
  }

  render() {

    const {search, value, placeData, showAddPlaceForm} = this.state;
    const {onSubmit} = this.props;

    return (
      <div>
        <h3>
          <span className="yellow">
            Add New Place
          </span>
        </h3>

        <ReactGooglePlacesSuggest
          googleMaps={window.google.maps}
          autocompletionRequest={{input: search}}
          onSelectSuggest={this.handleSelectSuggest}
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
            onChange={this.handleInputChange}
            onFocus={this.handleFocus}
          />

        </ReactGooglePlacesSuggest>

        {
          showAddPlaceForm  &&
          <AddPlaceForm
            placeData={placeData}
            onSubmit={onSubmit}
          />
        }
      </div>
    );
  }
}

AddPlaceSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default AddPlaceSearch;
