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
    };
  }

  componentDidMount() {
    const {geocodedPrediction, originalPrediction} = this.props.placeData;
    const name = originalPrediction.description.split(',')[0];
    const lat = geocodedPrediction.geometry.location.lat();
    const lng = geocodedPrediction.geometry.location.lng();

    this.setState({name, lat, lng});
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const formData  = new FormData(event.target);
    this.props.onSubmit(formData);

    this.setState({
      name: '',
      category: 'See & Do',
      description: '',
      lat: '',
      lng: ''
    });
  }

  render() {
    const {name, category, description, lat, lng} = this.state;

    return (
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
    );
  }
}

AddPlaceForm.propTypes = {
  placeData: PropTypes.object,
};

export default AddPlaceForm;
