import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';

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
      name: '',
      category: 'See & Do',
      description: '',
      lat: '',
      lng: '',
      image: null,
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
    const {name, category, description, lat, lng} = this.state;
    const {onAddPlaceSubmit} = this.props;

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
          <label>Search</label>
          <input
            type="text"
            value={value}
            placeholder="Search for a place"
            onChange={this.handleInputChange}
            onFocus={this.handleFocus}
            className="place-search-input"
          />

        </ReactGooglePlacesSuggest>

        <form onSubmit={this.handleSubmit}>

          <div>
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange} />
          </div>

          <div>
            <label>Category</label>
            <select
              name="category"
              value={category}
              onChange={this.handleChange}
            >
              <option value="See & Do">See &amp; Do</option>
              <option value="Food & Drink">Food &amp; Drink</option>
              <option value="Nightlife">Nightlife</option>
              <option value="Shop">Shop</option>
            </select>
          </div>

          <div>
            <label>Image</label>
            <input
              name="image"
              type="file"
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>

          <input type="submit" value="Add Place" />

          <input type="hidden" value={lat} name="lat" />
          <input type="hidden" value={lng} name="lng" />
        </form>
      </div>
    );
  }
}

AddPlaceSearch.propTypes = {
  onAddPlaceSubmit: PropTypes.func.isRequired,
}

export default AddPlaceSearch;
