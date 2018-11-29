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
      cityInput: geocodedPrediction.address_components[1].long_name,
    });
  }

  render() {
    const {nameInput, categoryInput, descriptionInput, imageInput, latInput, lngInput, cityInput} = this.state;

    return (
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={nameInput}
            onNameChange={(event) => this.handleNameChange(event)} />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={categoryInput}
            onNameChange={(event) => this.handleCategoryChange(event)} />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={descriptionInput}
            onNameChange={(event) => this.handleDescriptionChange(event)} />
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            value={imageInput}
            onNameChange={(event) => this.handleImageChange(event)} />
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
