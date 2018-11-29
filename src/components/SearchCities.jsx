import React, {Component} from 'react';

class SearchCities extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <p>Search Cities Component</p>
      </div>
    );
  }
}

export default SearchCities;

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
