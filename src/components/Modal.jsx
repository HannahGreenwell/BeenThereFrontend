import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddPlaceSearch from './AddPlaceSearch'
import EditPlaceForm from './EditPlaceForm'
import './Modal.css';

class Modal extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state: {
  //
  //   }
  // }

  render() {

    const {show, closeModal, onAddPlaceSubmit, onEditPlaceSubmit, formType, selectedPlace} = this.props;

    return (
      <div
        className="modal"
        style={{display: show ? 'block' : 'none'}}>

        <div
          className="overlay"
          onClick={closeModal}>
        </div>

        <div className="modal-content">
          <button
            title="Close"
            className="close-modal"
            onClick={closeModal}>
            <i className="material-icons">
              close
            </i>
          </button>

          {
            formType === 'add'
            ?
            <AddPlaceSearch onAddPlaceSubmit={onAddPlaceSubmit} />
            :
            <EditPlaceForm
              onEditPlaceSubmit={onEditPlaceSubmit}
              selectedPlace={selectedPlace}
            />
          }
        </div>

      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onAddPlaceSubmit: PropTypes.func.isRequired,
  onEditPlaceSubmit: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  selectedPlace: PropTypes.object
};

export default Modal;
