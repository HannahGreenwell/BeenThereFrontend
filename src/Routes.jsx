import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </div>
  </Router>
);

export default Routes;
