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

    const {place, onDeleteClick, onEditClick} = this.props;

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
              onDeleteClick={onDeleteClick}
              onEditClick={onEditClick}
            />
          }

        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  place: PropTypes.object,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default SideBar;
