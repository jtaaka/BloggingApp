import React, { Component } from "react";
import { Card } from "react-bootstrap";

const URL = "http://localhost:8080/posts";

class Blogposts extends Component {
  constructor(props) {
    super(props);

    this.state = {blogposts: []};
  }

  componentDidMount() {
    fetch(URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => this.setState({ blogposts: data }));
  }

  render() {
    return (
      <div class="card text-center">
        {this.state.blogposts.map( post =>
          <Card border="dark" style={{ width: '60%', margin: '0 auto', marginTop: "25px" }}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                {post.content}
              </Card.Text>
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
