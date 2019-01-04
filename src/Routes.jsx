import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import App from './App';
import Signin from './components/Signin/Signin';
import Signup from './components/Signin/Signup';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
    </div>
  </Router>
);

export default Routes;
