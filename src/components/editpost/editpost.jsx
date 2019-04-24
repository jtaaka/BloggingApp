import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import './editpost.css';

const URL = "http://localhost:8080/posts";

class Editpost extends Component {
  constructor(props) {
    super(props);

    let passedParameters = props.location.state;

    this.state = {
      id: passedParameters.editid,
      title: passedParameters.edittitle,
      content: passedParameters.editcontent
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toFrontPage = this.toFrontPage.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({ [event.target.id]: event.target.value} );
  }

  handleSubmit = event => {
    event.preventDefault();

    let requestBody = {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content
    };

    fetch(URL + "/" + this.state.id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    }).then(() => console.log(this.state.id + " " + this.state.title + " " + this.state.content))
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
              <Form.Control id="title" value={this.state.title} onChange={this.handleChange} className="mr-sm-2"/>
            </div>
            <div id="title-text">
              <Form.Label>Content</Form.Label>
              <Form.Control id="content" as="textarea" value={this.state.content} rows="5" onChange={this.handleChange}/>
            </div>
            <div id="buttons">
              <Button className="btn btn-primary float-left" onClick={this.toFrontPage}>Back to front page</Button>
              <Button className="btn btn-primary float-right" variant="success" disabled={!this.validateForm()} onClick={this.handleSubmit}>Submit</Button>
            </div>
          </div>
        </Container>
    );
  }
}

export default withRouter(Editpost);
