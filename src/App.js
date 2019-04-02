import React, { Component } from 'react';
import Navigation from './components/navigation/navigation'
import Blogposts from './components/blogposts/blogposts'

class App extends Component {

  render() {
    return (
      <div>
        <Navigation/>
        <div id="content">
          <Blogposts/>
        </div>
      </div>
    );
  }
}

export default App;
