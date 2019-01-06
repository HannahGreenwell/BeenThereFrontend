import React from 'react';
import PropTypes from 'prop-types';

function PlaceDetail(props) {

  const {place, onDeleteClick, onEditClick} = props;

  return (
    <div>
    {
      place.lat
      ?
      <div>
        <img src={place.image} alt={place.name} />

        <h2>
          <span className="yellow">{place.name}</span>
        </h2>

        <h4 className="category">{place.category}</h4>

        <p className="description">{place.description}</p>

        <p className="address">{place.address}</p>

        <i
          className="material-icons edit-delete-btn"
          onClick={onEditClick}
          >
          edit
        </i>

        <i
          className="material-icons edit-delete-btn"
          onClick={onDeleteClick}
        >
          delete
        </i>
      </div>
      :
      <p>Click on a marker to see more information about the place.</p>
    }
    </div>
  );
}

PlaceDetail.propTypes = {
  place: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default PlaceDetail;
