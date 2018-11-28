import React, {Component} from 'react';

import './Instructions.css';

class Instructions extends Component {

  render() {
    return (
      <div className="instructions">
        <h2>Instructions</h2>
        <p><span className="instructions-bold">Click on a marker</span> to see more information about the place.</p>
        <p><span className="instructions-bold">Double click a spot on the map</span> to add it to your map.</p>
      </div>
    );
  }
}

export default Instructions;
