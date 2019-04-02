import React, { Component } from "react";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";
import Add_blog from "../add_blog/add_blog";

const URL = "http://localhost:8080/users/login";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {username: "", password: "", loggedIn: false};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
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
        this.setState({loggedIn: true})
        } else {
          this.setState({loggedIn: false})}});
  }

  logout() {
    this.setState({username: "", password: "", loggedIn: false})
  }

  render() {

    if (this.state.loggedIn === false) {
      return (
          <Form onSubmit={this.handleSubmit}>
            <InputGroup>
              <FormControl id="username" onChange={this.handleChange} placeholder="Enter username" className="mr-sm-2"/>
              <FormControl id="password" type="password" onChange={this.handleChange} placeholder="Enter password"/>
              <InputGroup.Append>
                <Button
                    variant="primary"
                    disabled={!this.validateForm()}
                    type="submit">
                  Log in
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
      );
    } else {
      return (
          <InputGroup>
            <InputGroup.Text>Logged In as, {this.state.username}</InputGroup.Text>
            <InputGroup.Append>
              <Add_blog/>
            </InputGroup.Append>
            <InputGroup.Append>
              <Button onClick={this.logout}>Log Out</Button>
            </InputGroup.Append>
          </InputGroup>
      );
    }
  }
}

export default Login;
