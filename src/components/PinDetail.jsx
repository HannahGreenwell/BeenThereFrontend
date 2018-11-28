import React, {Component} from 'react';

class PinDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {name, description, category, images} = this.props.pin;

    return (
      <div>
        <h2>{name}</h2>
        <h3>{category}</h3>
        <img src="http://www.fillmurray.com/300/200"/>
        <p>{description}</p>
      </div>
    );
  }
}

export default PinDetail;
