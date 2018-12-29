import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PlaceDetail from './PlaceDetail'

import './SideBar.css';

class SideBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSideBar: true,
      showPlaceDetail: true,
    };
  }

  render() {

    const {place, onClick} = this.props;

    return (
      <div className="sidebar">

        <div className="sidebar-header">
          <i className="material-icons">pin_drop</i>

          <button className="open-close">
            <i className="material-icons">close</i>
          </button>
        </div>

        <div className="sidebar-place-detail">
          <h3>
            <span className="yellow-bg">
              My Places
            </span>
          </h3>

          {
            this.state.showPlaceDetail &&
            <PlaceDetail
              place={place}
              onClick={onClick}
            />
          }

        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  place: PropTypes.object,
};

export default SideBar;
