import React from 'react';
import PropTypes from 'prop-types';

function PinDetail(props) {

  const {pin, onClick} = props;

  return (
    <div>
    {
      pin.lat
      ?
      <div>
        <h2>
          <span className="yellow">{pin.name}</span>
        </h2>

        <p className="category">{pin.category}</p>

        <img src={pin.image} alt={pin.name} />

        <p className="description">{pin.description}</p>

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

PinDetail.propTypes = {
  pin: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PinDetail;
