import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import LoginForm from './components/LoginForm';
import BeenThereMap from './components/BeenThereMap';

const Routes = (
  <Router>
    <div>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/beenthere/:id" component={BeenThereMap} />
    </div>
  </Router>
);

export default Routes;
