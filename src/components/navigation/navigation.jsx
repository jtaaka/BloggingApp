import React, { Component } from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';
import Login from '../login/login'
import { NavLink } from 'react-router-dom'

class Navigation extends Component {

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
          <NavLink exact to="/">
            <Navbar.Brand>
              BlogApp
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle/>
          <Navbar.Collapse>
            <Nav>
              <Login/>
            </Nav>
            <Nav className="mr-auto">
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Navigation;
