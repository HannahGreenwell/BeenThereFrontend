import React, {Component} from 'react';

class SideBar extends Component {
  render() {
    const {name, description, category, images} = this.props.pin;
    return (
      <div className="sideBar">
        <i className="material-icons">pin_drop</i>

        <h2>{name}</h2>
        <h3>{category}</h3>
        <img src="http://www.fillmurray.com/300/200"/>
        <p>{description}</p>
      </div>
    );
  }
}

export default SideBar;
