import React, { Component } from "react";
import { Button, Form, Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './comment.css';
import Cookies from 'js-cookie'

const URL_POST = "http://localhost:8080/comment";
const ALL_COMMENTS = "http://localhost:8080/comments";
const DELETE_URL = "http://localhost:8080/comment/";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      comments: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    fetch(ALL_COMMENTS, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(response => response.json())
        .then(data => this.setState( {comments: data} ));
    }

  handleChange = event => {
    event.preventDefault();

    this.setState( {[event.target.id]: event.target.value} );
  }

  handleSubmit = event => {
    event.preventDefault();

    let requestBody = {
      content: this.state.content,
      postId: this.props.id
    };

    fetch(URL_POST, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    }).then(response => response.json())
      .then(data => this.setState({comments: [...this.state.comments, data]}))
      .then(() => {
      fetch(ALL_COMMENTS, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(response => response.json())
        .then(data => this.setState( {comments: data}))
    });
  }
      
  validateForm() {
    return this.state.content !== "";
  }

  delete(id) {
    console.log("ID =" + id)
    fetch(DELETE_URL + id, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    }).then(() => 
    fetch(ALL_COMMENTS, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => this.setState({ comments: data})));
  }

  render() {
    const commentsByPost = this.state.comments.map(comment => {
      if (comment.postId === this.props.id) {
        return (
          <Card id="padding">
            {comment.content}
            <Card.Footer>
              <small className="text-muted">Posted at {comment.date}</small>
              <Button 
                disabled={Cookies.get("loggedIn") === undefined} 
                className="btn float-right" 
                id={comment.id} 
                onClick={() => this.delete(comment.id)} 
                variant="danger">
                Delete
              </Button>
            </Card.Footer>
          </Card>
        ) 
      }
    });

    return (
      <Container>
          <h2 id="header2">Comments</h2>
          {commentsByPost}
        <div className="mx-auto">
            <Form.Control id="content" as="textarea" rows="5" placeholder="Write a comment..." onChange={this.handleChange} />
            <Button className="btn btn-primary float-left"
                    id="commentButton"
                    disabled={!this.validateForm()} 
                    onClick={this.handleSubmit}>
                    Submit
            </Button>
        </div>
      </Container>
    );
  }
}

export default Comment;