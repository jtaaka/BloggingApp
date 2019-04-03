import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import Editpost from "../editpost/editpost";
import * as ReactDOM from "react-dom";

const URL = "http://localhost:8080/posts";

class Blogposts extends Component {
  constructor(props) {
    super(props);

    this.state = {blogposts: []};
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
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Posted at {post.date}</small>
            </Card.Footer>
            <Button id={post.id} onClick={(e) => this.editPost(e.target.id, post.title, post.content)} variant="secondary">Edit</Button>
          </Card>)}
      </div>
    );
  }
}

export default Blogposts;
