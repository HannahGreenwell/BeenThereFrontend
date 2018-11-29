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
          <h2><span className="yellow">{pin.name}</span></h2>
          <p className="category">{pin.category}</p>
          <img src={pin.images}/>
          <p className="description">{pin.description}</p>
        </div>
        :
        <p>Click on a marker to see more information about the place.</p>
      }
      </div>
    );
  }
}

export default PinDetail;
