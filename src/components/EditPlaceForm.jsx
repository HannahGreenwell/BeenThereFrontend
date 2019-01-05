import React, {Component} from 'react';

class EditPlaceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: 'See & Do',
      description: '',
      lat: '',
      lng: ''
    };
  }

  componentDidMount() {
    const {name, category, description, lat, lng} = this.props.selectedPlace;

    this.setState({
      name,
      category,
      description,
      lat,
      lng
    });
  }

  handleChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const {name, category, description, lat, lng} = this.state;
    const formData = {name, category, description, lat, lng};
    this.props.onSubmit(formData);
  }

  // handleSubmit = event => {
  //   event.preventDefault();
  //
  //   const formData = new FormData(event.target);
  //   this.props.onEditPlaceSubmit(formData);
  // }

  render() {

    const {name, category, description, lat, lng} = this.state;

    return (
      <div>
        <h3>
          <span className="yellow">
            Edit Place
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
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>

          <input type="submit" value="Edit Place" />

          <input type="hidden" value={lat} name="lat" />
          <input type="hidden" value={lng} name="lng" />
        </form>
      </div>
    );
  }
}

export default EditPlaceForm;
