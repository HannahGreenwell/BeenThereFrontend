import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import App from './App';
import Login from './components/Login';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>
);

export default Routes;
