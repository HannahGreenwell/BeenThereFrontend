import React from 'react';
import PropTypes from 'prop-types';

function DeletePlaceConfirm(props) {

  const {selectedPlace, onClick, closeModal} = props;

  return (
    <div>
      <h3>
        <span className="yellow">
          Delete Place
        </span>
      </h3>

      <p className="delete-confirmation">
        Please confirm that you want
        <span className="bold"> {selectedPlace.name} </span>
        permanently deleted from your saved places.
      </p>

      <button
        className="delete"
        onClick={onClick}
      >
        Delete
      </button>

      <button
        className="delete"
        onClick={closeModal}
      >
        Cancel
      </button>
    </div>
  );
}

DeletePlaceConfirm.propTypes = {
  selectedPlace: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default DeletePlaceConfirm;
