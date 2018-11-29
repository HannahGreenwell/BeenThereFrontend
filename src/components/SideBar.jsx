import React, {Component} from 'react';

import PinDetail from './PinDetail'
import AddPlace from './AddPlace'
import FilterPlaces from './FilterPlaces'
import SearchCities from './SearchCities'
import GoogleSuggest from './GoogleSuggest'

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

  handleClick() {
    console.log('clicked');
  }

  handleAddPlaceClick() {
    this.setState({showAddPlace: true});
  }

  render() {
    return (
      <div className="sidebar">

        <div className="sidebar-header">
          <i className="material-icons">pin_drop</i>
          <button
            onClick={this.handleClick}
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
              Place Detail
            </span>
          </h3>
          {
            this.state.showPinDetail &&
            <PinDetail
              pin={this.props.pin}
            />
          }
        </div>

        <div className="sidebar-add-place">
          <h3>
            <span
              className="yellow-bg"
              onClick={this.handleAddPlaceClick}
            >
              Add New Place
            </span>
          </h3>
          {
            this.state.showAddPlace &&
            <AddPlace />
          }
        </div>

        <div className="sidebar-filter-places">
          <h3>
            <span
              className="yellow-bg"
            >
              Filter Places
            </span>
          </h3>
          {
            this.state.showFilterPlaces &&
            <FilterPlaces />
          }
        </div>

        <div className="sidebar-search-cities">
          <h3>
            <span
              className="yellow-bg"
            >
              Search by City
            </span>
          </h3>
          {
            this.state.showSearchCities &&
            <SearchCities />
          }
        </div>
      </div>
    );
  }
}

export default SideBar;
