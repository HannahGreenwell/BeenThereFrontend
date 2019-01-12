import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddPlaceForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: '',
      category: 'See & Do',
      description: '',
      lat: '',
      lng: ''
    };
  }

  componentDidMount() {
    const {geocodedPrediction, originalPrediction} = this.props.placeData;
    const name = originalPrediction.description.split(',')[0];
    const address = geocodedPrediction.formatted_address;
    const lat = geocodedPrediction.geometry.location.lat();
    const lng = geocodedPrediction.geometry.location.lng();

    this.setState({name, address, lat, lng});
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
  }

  render() {
    const {name, address, category, description, lat, lng} = this.state;

    return (
      <div>
        <h3>
          <span className="yellow">
            Add New Place
          </span>
        </h3>

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
            <label>Address</label>
            <input
              name="address"
              type="text"
              value={address}
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
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label className="image-label">Image</label>
            <input
              name="image"
              type="file"
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

AddPlaceForm.propTypes = {
  placeData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};

export default AddPlaceForm;
