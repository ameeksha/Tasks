import React from 'react';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import ActivateEmail from './components/activateEmail'
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard';


function App() {
  return (
    <React.Fragment>

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/activateEmail/:id" component={ActivateEmail} />
        <Route path="/dashboard" component={Dashboard} />
        <Redirect from="/" exact to="/login" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
