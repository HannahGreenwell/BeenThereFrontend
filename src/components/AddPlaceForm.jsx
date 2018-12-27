import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddPlaceForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: 'See & Do',
      description: '',
      lat: '',
      lng: '',
      city: '',
      image: null,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {geocodedPrediction, originalPrediction} = this.props.placeData;
    const name = originalPrediction.description.split(',')[0];
    const lat = geocodedPrediction.geometry.location.lat();
    const lng = geocodedPrediction.geometry.location.lng();
    const city = geocodedPrediction.address_components[2].short_name;

    this.setState({name, lat, lng, city});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({category: event.target.value});
  }

  handleImageChange = event => {
    this.setState({image: event.target.files[0]});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData  = new FormData(event.target);
    this.props.onSubmit(formData);

    this.setState({
      name: '',
      category: 'See & Do',
      description: '',
      lat: '',
      lng: '',
      city: '',
      image: null,
    });
  }

  render() {
    const {name, category, description, lat, lng, city} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>

        <div>
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={this.handleNameChange} />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={category}
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
            name="image"
            type="file"
            onChange={this.handleImageChange} />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={this.handleDescriptionChange}
          />
        </div>

        <input type="submit" value="Add Place" />

        <input type="hidden" value={lat} name="lat" />
        <input type="hidden" value={lng} name="lng" />
        <input type="hidden" value={city} name="city" />
      </form>
    );
  }
}

AddPlaceForm.propTypes = {
  placeData: PropTypes.object,
};

export default AddPlaceForm;
