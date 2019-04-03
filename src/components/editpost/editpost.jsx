import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import * as ReactDOM from "react-dom";
import Blogposts from "../blogposts/blogposts";

const URL = "http://localhost:8080/posts";

class Editpost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      title: this.props.title,
      content: this.props.content
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMain = this.renderMain.bind(this);
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
  }

  renderMain() {
    ReactDOM.render(
      <Blogposts/>
      , document.getElementById("content"))
  }

  render() {
    return (
      <div className="mx-auto">
        <Form.Label>Title</Form.Label>
        <Form.Control id="title" value={this.state.title} onChange={this.handleChange} className="mr-sm-2"/>
        <Form.Label>Content</Form.Label>
        <Form.Control id="content" as="textarea" value={this.state.content} rows="5" onChange={this.handleChange}/>
        <Button className="btn btn-primary float-left" onClick={this.renderMain}>Back to Blogs</Button>
        <Button className="btn btn-primary float-right" onClick={this.handleSubmit}>Submit</Button>
      </div>
    );
  }
}

export default Editpost;
