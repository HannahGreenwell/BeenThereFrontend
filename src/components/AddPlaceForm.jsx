import React, {Component} from 'react';

class AddPlaceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameValue: '',
      categoryValue: '',
      descriptionValue: '',
      imageValue: '',
      latValue: '',
      lngValue: '',
      cityValue: '',
    };
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

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({nameValue: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({categoryValue: event.target.value});
  }

  handleImageChange(event) {
    this.setState({imageValue: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({descriptionValue: event.target.value});
  }

  render() {
    const {
      nameValue,
      categoryValue,
      descriptionValue,
      imageValue,
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
            imageValue,
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
            type="text"
            value={this.state.imageValue}
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

export default AddPlaceForm;
