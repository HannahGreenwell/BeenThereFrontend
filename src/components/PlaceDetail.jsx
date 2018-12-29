import React from 'react';
import PropTypes from 'prop-types';

function PlaceDetail(props) {

  const {place, onClick} = props;
  
  return (
    <div>
    {
      place.lat
      ?
      <div>
        <h2>
          <span className="yellow">{place.name}</span>
        </h2>

        <p className="category">{place.category}</p>

        <img src={place.image} alt={place.name} />

        <p className="description">{place.description}</p>

        <i className="material-icons edit-delete-btn">edit</i>
        <i
          className="material-icons edit-delete-btn"
          onClick={onClick}
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
  onClick: PropTypes.func.isRequired,
};

export default PlaceDetail;
