import React, {Component} from "react";
import {Navbar, Nav, Button} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";
import {Redirect, withRouter} from 'react-router-dom';
import './navigation.css';

export class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      logout: false
    };

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    Cookies.remove("username");
    Cookies.remove("loggedIn");
    this.setState({"logout":true});
  };

  renderLogout(){
    if(this.state.logout) {
      this.setState({"logout": false});
      return (<Redirect to="/login"/>);
    }
  }

  handleSelect(eventKey) {
    console.log({eventKey})
  }

  render() {
    if (window.location.pathname === '/login' || window.location.pathname === '/any') {
      return null;
    } else {
      return (
          <div>
            {this.renderLogout()}
            <Navbar expand="md" bg="dark" variant="dark" collapseOnSelect="true">

              <LinkContainer to="/">
                <Navbar.Brand>
                  Blogging app
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
              <Navbar.Collapse id="responsive-navbar-nav">

                <Nav id ="borderless" variant="tabs" className="mr-auto" activeKey="1" onSelect={k => this.handleSelect(k)}>
                  <LinkContainer to={"/addpost"} exact={true}>
                    <Nav.Link>Add Blogpost</Nav.Link>
                  </LinkContainer>
                </Nav>

                <Navbar.Text id="signed-in">Signed in as, {Cookies.get("username")}</Navbar.Text>
                <Nav.Item>
                  <Button id="logout" variant="outline-danger" onClick={this.logout}>Log out</Button>
                </Nav.Item>
              </Navbar.Collapse>
            </Navbar>
          </div>
      );
    }
  }
}

export default withRouter(Navigation);