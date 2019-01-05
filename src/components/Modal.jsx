import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

function Modal(props) {

  const {closeModal, children} = props;

  return (
    <div
      className="modal"
    >
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
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
