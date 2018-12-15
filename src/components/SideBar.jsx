import React, {Component} from 'react';

import PinDetail from './PinDetail'
import AddPlace from './AddPlace'

import './SideBar.css';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideBar: true,
      showPinDetail: true,
      showAddPlace: false,
      showFilterPlaces: false,
      showSearchCities: false,
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.pinAdded !== prevProps.pinAdded) {
      this.setState({showAddPlace: false});
    }
  }

  handleAddPlaceClick() {
    this.setState({showAddPlace: true});
  }

  handleFilterPlacesClick() {
    this.setState({showFilterPlaces: true});
  }
  handleSearchCitiesClick() {
    this.setState({showSearchCities: true});
  }

  render() {
    return (
      <div className="sidebar">

        <div className="sidebar-header">
          <i className="material-icons">pin_drop</i>
          <button
            onClick={() => this.handleClick()}
            className="open-close"
          >
            <i className="material-icons">close</i>
          </button>
        </div>

        <div className="sidebar-place-detail">
          <h3>
            <span
              className="yellow-bg"
            >
              My Places
            </span>
          </h3>
          {
            this.state.showPinDetail &&
            <PinDetail
              pin={this.props.pin}
            />
          }
        </div>
      </div>
    );
  }
}

export default SideBar;
