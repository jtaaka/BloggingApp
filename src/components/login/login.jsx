import React, { Component } from "react";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";
import { withRouter } from 'react-router'
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './login.css';

const URL = "http://localhost:8080/users/login";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {username: "", password: "", loggedIn: false};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateForm() {
    return this.state.username.match(/^[a-z0-9\-_.]+$/i) !== null
        && this.state.username.length > 0
        && this.state.username.length < 20
        && this.state.password.length > 0;
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    let status = false;

    console.log("user: " + this.state.username);
    console.log("pass: " + this.state.password);

    let requestBody = {
      username: this.state.username,
      password: this.state.password
    };

    fetch(URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    })
        .then(function(response) {
          if(response.status === 200) {
            console.log("SUCCESS");
            status = true;
          } else if(response.status === 401) {
            alert("Invalid username or password");
            status = false;
          }
        }).then(() => { if(status) {
            this.setState({loggedIn: true});
            Cookies.set("loggedIn", true);
            Cookies.set("username", requestBody.username);
            this.props.history.push("/")
        } else {
            this.setState({loggedIn: false});
    }})}

  render() {
    return (
        <Container id="loginContainer">
          <Row className="justify-content-center" id="form">
            <Col xl={6} lg={7} md={7} sm={10} xs={12}>
              <Form onSubmit={this.handleSubmit}>
              <FormControl id="username" onChange={this.handleChange} placeholder="Enter username" />
              <FormControl id="password" type="password" onChange={this.handleChange} placeholder="Enter password" />
            
              <Button
                id="form-button"
                width="auto"
                size="md" block
                variant="primary"
                disabled={!this.validateForm()}
                type="submit">
                Log in
              </Button>
            
              <Button
                id="form-button"
                variant="primary"
                size="md" block
                onClick={() => {
                this.props.history.push("/any")}}>
                Continue as a guest
              </Button>
              
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Login);
