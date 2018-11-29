import React, {Component} from 'react';

import GoogleSuggest from './GoogleSuggest';
import AddPlaceForm from './AddPlaceForm';

class AddPlace extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <GoogleSuggest
        />
      </div>
    );
  }
}

export default AddPlace;
