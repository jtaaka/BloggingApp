import React, { Component } from 'react';
import Navigation from './components/navigation/navigation'
import Blogposts from './components/blogposts/blogposts'
import Container from "react-bootstrap/Container";

class App extends Component {

  render() {
    return (
      <div>
        <Navigation/>
        <Blogposts/>
      </div>
    );
  }
}

export default App;
