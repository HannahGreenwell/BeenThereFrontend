import React from 'react';
import PropTypes from 'prop-types';

function PinDetail(props) {

  const {pin} = props;

  return (
    <div>
    {
      pin.lat
      ?
      <div>
        <h2><span className="yellow">{pin.name}</span></h2>
        <p className="category">{pin.category}</p>
        <img src={pin.images} alt={pin.name} />
        <p className="description">{pin.description}</p>
      </div>
      :
      <p>Click on a marker to see more information about the place.</p>
    }
    </div>
  );
}

PinDetail.propTypes = {
  pin: PropTypes.object.isRequired,
};


export default PinDetail;
