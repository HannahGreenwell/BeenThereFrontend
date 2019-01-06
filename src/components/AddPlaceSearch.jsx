import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';

class AddPlaceSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      value: '',
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
    console.log(geocodedPrediction.formatted_address);
    this.setState({
      search: '',
      value: originalPrediction.description,
    });

    this.props.onChange(geocodedPrediction, originalPrediction);
  }

  render() {

    const {search, value} = this.state;

    return (
      <div className="search-modal-wrapper">
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
            className="search-place-input"
          />

        </ReactGooglePlacesSuggest>
      </div>
    );
  }
}

AddPlaceSearch.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default AddPlaceSearch;
