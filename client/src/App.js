import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './routes/LandingPage'
import LoginPage from './routes/LoginPage'
import DashBoard from './routes/Dashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route exact path={'/'} render={props => <LandingPage {...props} />} />
          <Route path={`/login`} render={props => <LoginPage {...props} />} />
          <Route path={`/dashboard`} render={props => <DashBoard {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
