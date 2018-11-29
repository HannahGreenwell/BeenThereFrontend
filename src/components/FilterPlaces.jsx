import React, {Component} from 'react';

class FilterPlaces extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <p>Filter Places Component</p>
      </div>
    );
  }
}

export default FilterPlaces;

// {
//   pin.lat
//   ?
//   <div>
//     <h2>{pin.name}</h2>
//     <h3>{pin.category}</h3>
//     <img src="http://www.fillmurray.com/300/200"/>
//     <p>{pin.description}</p>
//   </div>
//   :
//   <p>Click on a marker to see more information about the place.</p>
// }
