import React, {Component} from 'react';

import Instructions from './Instructions'
import PinDetail from './PinDetail'

import './SideBar.css';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideBar: true
    };
  }

  handleClick() {
    console.log('clicked');
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
            <i className="material-icons">
            close
            </i>
          </button>
        </div>

        {this.props.showInstructions && <Instructions />}
        {
          this.props.showPinDetail &&
          <PinDetail
            pin={this.props.pin}
          />
        }

        <div className="sidebar-footer">
          <h3>Filter</h3>

          <form>
            <h3>Search</h3>
            <input type="text" placeholder="e.g. Sydney" />
          </form>
        </div>
      </div>
    );
  }
}

export default SideBar;
