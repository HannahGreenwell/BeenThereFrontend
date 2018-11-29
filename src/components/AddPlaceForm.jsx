import React, {Component} from 'react';

class AddPlaceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: '',
      categoryInput: '',
      descriptionInput: '',
      imageInput: '',
      latInput: '',
      lngInput: '',
      cityInput: '',
    };
  }

  componentDidMount() {
    const { geocodedPrediction, originalPrediction } = this.props.placeData;
    const name = originalPrediction.description.split(',')[0];
    const lat = geocodedPrediction.geometry.location.lat();
    const lng = geocodedPrediction.geometry.location.lng();

    this.setState({
      nameInput: name,
      latInput: lat,
      lngInput: lng,
      cityInput: geocodedPrediction.address_components[2].long_name,
    });
  }

  handleNameChange(event) {
    this.setState({nameInput: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({categoryInput: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({descriptionInput: event.target.value});
  }

  handleImageChange(event) {
    this.setState({imageInput: event.target.value});
  }

  render() {
    const {nameInput, categoryInput, descriptionInput, imageInput, latInput, lngInput, cityInput} = this.state;

    return (
      <form
        onSubmit={(event, name, category, description, images, lat, lng, city) => this.props.onSubmit(event, nameInput, categoryInput, descriptionInput, imageInput, latInput, lngInput, cityInput)}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={nameInput}
            onChange={(event) => this.handleNameChange(event)} />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={categoryInput}
            onChange={(event) => this.handleCategoryChange(event)} />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={descriptionInput}
            onChange={(event) => this.handleDescriptionChange(event)} />
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            value={imageInput}
            onChange={(event) => this.handleImageChange(event)} />
        </div>
        <input type="submit" value="Add Place" />

        <input type="hidden" value={latInput} />
        <input type="hidden" value={lngInput} />
        <input type="hidden" value={cityInput} />
      </form>
    );
  }
}

export default AddPlaceForm;
