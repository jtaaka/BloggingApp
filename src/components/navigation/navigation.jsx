import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import Search from '../search/search';
import Login from '../login/login'

class Navigation extends Component {

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
          <Navbar.Brand>Bloggingapp</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse>
            <Nav>
              <Login/>
            </Nav>
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <Search/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Navigation;
