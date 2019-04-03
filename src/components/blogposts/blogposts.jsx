import React, { Component } from "react";
import {Button, Card} from "react-bootstrap";
import Editpost from "../editpost/editpost";
import * as ReactDOM from "react-dom";

const URL = "http://localhost:8080/posts";
const DELETE_URL = "http://localhost:8080/posts/";

class Blogposts extends Component {
  constructor(props) {
    super(props);

    this.state = {blogposts: []};
    this.delete = this.delete.bind(this);
    this.editPost = this.editPost.bind(this);
  }

  componentDidMount() {
    fetch(URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => this.setState({ blogposts: data }));
  }

  delete(id) {
    console.log(id)
    fetch(DELETE_URL + id, {
      method: 'DELETE',//
      headers: {'Content-Type': 'application/json'},
    }).then(() => console.log("Deleted blogpost id = " + id)).then(() =>
    fetch(URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
        .then(response => response.json())
        .then(data => this.setState({ blogposts: data })));
  }

  editPost(id, title, content) {
    console.log(id, title, content)

    ReactDOM.render(
      <Editpost id={id} title={title} content={content}/>
      , document.getElementById("content"))
  };

  render() {
    return (
      <div className="card text-center">
        {this.state.blogposts.map( post =>
          <Card key={post.id} border="dark" style={{ width: '60%', margin: '0 auto', marginTop: "25px" }}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                {post.content}
              </Card.Text>
              <Button className="btn float-left" id={post.id} onClick={(e) => this.editPost(e.target.id, post.title, post.content)} variant="secondary">Edit</Button>
              <Button className="btn btn-primary float-right" id={post.id} onClick={(e) => this.delete(e.target.id)}>Delete</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Posted at {post.date}</small>
            </Card.Footer>
          </Card>)}
      </div>
    );
  }
}

export default Blogposts;
