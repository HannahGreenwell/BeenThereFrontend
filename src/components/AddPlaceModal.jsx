import React from 'react';
import PropTypes from 'prop-types';

import AddPlace from './AddPlace'
import './AddPlaceModal.css';

function AddPlaceModal(props) {

  const {
    show,
    closeCallBack
  } = props;

  return (
    <div
      className="modal"
      style={{display: show ? 'block' : 'none'}}
    >

      <div
        className="overlay"
        onClick={closeCallBack}
      >
      </div>

      <div className="modal-content">

        <h3>
          <span className="yellow">
            Add New Place
          </span>
        </h3>

        <button
          title="Close"
          className="close-modal"
          onClick={closeCallBack}
        >
          <i className="material-icons">
            close
          </i>
        </button>

        <AddPlace />

      </div>

    </div>
  );
}

export default AddPlaceModal;
