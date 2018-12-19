import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddPlaceForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nameValue: '',
      categoryValue: 'See & Do',
      descriptionValue: '',
      latValue: '',
      lngValue: '',
      cityValue: '',
      imageFile: null,
      loaded: 0,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    // this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  componentDidMount() {
    const { geocodedPrediction, originalPrediction } = this.props.placeData;
    const name = originalPrediction.description.split(',')[0];
    const lat = geocodedPrediction.geometry.location.lat();
    const lng = geocodedPrediction.geometry.location.lng();

    this.setState({
      nameValue: name,
      latValue: lat,
      lngValue: lng,
      cityValue: geocodedPrediction.address_components[2].short_name,
    });
  }

  handleNameChange(event) {
    this.setState({nameValue: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({categoryValue: event.target.value});
  }

  handleImageChange = event => {
    this.setState({imageFile: event.target.files[0]});
  }

  handleDescriptionChange(event) {
    this.setState({descriptionValue: event.target.value});
  }

  render() {
    const {
      nameValue,
      categoryValue,
      descriptionValue,
      imageFile,
      latValue,
      lngValue,
      cityValue
    } = this.state;

    return (
      <form
        onSubmit={(event, name, category, description, images, lat, lng, city) => {
          this.props.onSubmit(
            event,
            nameValue,
            categoryValue,
            descriptionValue,
            imageFile,
            latValue,
            lngValue,
            cityValue
          )
        }}
      >

        <div>
          <label>Name</label>
          <input
            type="text"
            value={this.state.nameValue}
            onChange={this.handleNameChange} />
        </div>

        <div>
          <label>Category</label>
          <select
            value={this.state.categoryValue}
            onChange={this.handleCategoryChange}
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
            type="file"
            onChange={this.handleImageChange} />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={this.state.descriptionValue}
            onChange={this.handleDescriptionChange}
          />
        </div>

        <input type="submit" value="Add Place" />

        <input type="hidden" value={latValue} />
        <input type="hidden" value={lngValue} />
        <input type="hidden" value={cityValue} />
      </form>
    );
  }
}

AddPlaceForm.propTypes = {
  placeData: PropTypes.object,
};

export default AddPlaceForm;
