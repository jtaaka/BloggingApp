import React, { Component } from 'react';
import Navigation from './components/navigation/navigation'
import { Switch, Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Navigation}/>
      </Switch>
    );
  }
}

export default App;
