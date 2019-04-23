import React, { Component } from "react";
import {Button, Card} from "react-bootstrap";
import Editpost from "../editpost/editpost";
import { Link } from "react-router-dom";

const URL = "http://localhost:8080/posts";
const DELETE_URL = "http://localhost:8080/posts/";

class Blogposts extends Component {
  constructor(props) {
    super(props);

    this.state = {blogposts: [], editid: "", edittitle: "", editcontent: ""};
    this.delete = this.delete.bind(this);
    //this.editPost = this.editPost.bind(this);
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
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    }).then(() => console.log("Deleted blogpost id = " + id)).then(() =>
    fetch(URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => this.setState({ blogposts: data })));
  }

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

              <Link 
                style={{ textDecoration: 'none' }} 
                to={{
                  pathname: '/editpost/',
                  state: {
                    editid: post.id,
                    edittitle: post.title,
                    editcontent: post.content 
                    }
                  }}>
                <Button 
                  className="btn float-left" 
                  id={post.id} 
                  variant="secondary">
                  Edit
                </Button>
              </Link>

            <Button className="btn float-right" id={post.id} onClick={() => this.delete(post.id)} variant="secondary">Delete</Button>
              
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
