import React, {Component} from 'react';

class PinDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {pin} = this.props;

    return (
      <div>
      {
        pin.lat
        ?
        <div>
          <h2>{pin.name}</h2>
          <h3>{pin.category}</h3>
          <img src={pin.images}/>
          <p>{pin.description}</p>
        </div>
        :
        <p>Click on a marker to see more information about the place.</p>
      }
      </div>
    );
  }
}

export default PinDetail;
