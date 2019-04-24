import React, { Component } from 'react';
import Navigation from "./components/navigation/navigation";
import Blogposts from './components/blogposts/blogposts';
import Addpost from './components/addpost/addpost';
import Editpost from './components/editpost/editpost';
import Login from './components/login/login';
import PrivateRoute from './components/PrivateRoute';




import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRouteAnyUser from "./components/PrivateRouteAnyUser";
import Blogpostsanyuser from "./components/blogposts/blogpostsanyuser";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div>
        <Navigation/>
        <Switch>
          <Route exact path = "/login" component={Login} />
          <PrivateRouteAnyUser exact path = "/any" component={Blogpostsanyuser} />
          <PrivateRoute exact path = "/" component={Blogposts} />
          <PrivateRoute exact path = "/addpost" component={Addpost} />
          <PrivateRoute exact path = "/editpost" component={Editpost} />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
