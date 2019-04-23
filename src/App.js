import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import Blogposts from './components/blogposts/blogposts';
import Addpost from './components/addpost/addpost';
import Editpost from './components/editpost/editpost';


import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path = "/" component={Blogposts} />
          <Route exact path = "/addpost" component={Addpost} />
          <Route exact path = "/editpost" component={Editpost} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
