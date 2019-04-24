import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import './addpost.css';

const URL = "http://localhost:8080/posts";

class Addpost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toFrontPage = this.toFrontPage.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    let requestBody = {
      title: this.state.title,
      content: this.state.content
    };

    fetch(URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    }).then(() => console.log(this.state.title + " " + this.state.content))
      .then(() => this.props.history.push("/"));
  }

  toFrontPage() {
    this.props.history.push("/");
  }

  validateForm() {
    return this.state.title !== "" && this.state.content !== "";
  }

  render() {
    return (
        <Container>
          <div className="mx-auto">
            <div id="title-text">
              <Form.Label>Title</Form.Label>
              <Form.Control id="title" onChange={this.handleChange} placeholder="Enter title" className="mr-sm-2" />
            </div>
            <div id="title-text">
              <Form.Label>Content</Form.Label>
              <Form.Control id="content" as="textarea" rows="5" placeholder="Enter text" onChange={this.handleChange} />
            </div>
            <div id="buttons">
              <Button className="btn btn-primary float-left" onClick={this.toFrontPage}>Back to Blogs</Button>
              <Button className="btn btn-primary float-right" disabled={!this.validateForm()} onClick={this.handleSubmit}>Submit</Button>
            </div>
          </div>
        </Container>
    );
  }
}

export default withRouter(Addpost);
