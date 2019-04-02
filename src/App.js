import React, { Component } from 'react';
import Navigation from './components/navigation/navigation'
import { Switch, Route } from 'react-router-dom'
import Container from "react-bootstrap/Container";

class App extends Component {

  render() {
    return (
        <Container>
        {<Navigation/>}
          <div id="content"></div>
        </Container>
    );
  }
}

export default App;
