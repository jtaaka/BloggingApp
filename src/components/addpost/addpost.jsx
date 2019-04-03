import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import * as ReactDOM from "react-dom";
import Blogposts from "../blogposts/blogposts";

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
    this.renderMain = this.renderMain.bind(this);
    this.add = this.add.bind(this);
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
  }

  renderMain() {
    ReactDOM.render(
        <Blogposts/>
        , document.getElementById("content"))
  }

  add() {
    ReactDOM.render(
    <div className="mx-auto">
      <Form.Label>Title</Form.Label>
      <Form.Control id="title" onChange={this.handleChange} placeholder="Enter title" className="mr-sm-2"/>
      <Form.Label>Content</Form.Label>
      <Form.Control id="content" as="textarea" rows="5" placeholder="Enter text" onChange={this.handleChange}/>
      <Button className="btn btn-primary float-left" onClick={this.renderMain}>Back to Blogs</Button>
      <Button className="btn btn-primary float-right" onClick={this.handleSubmit}>Submit</Button>
    </div>
    , document.getElementById("content"))
  }

  render() {
      return (
          <Button onClick={this.add}>Add new blogpost</Button>
      );
  }
}

export default Addpost;
