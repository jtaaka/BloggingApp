import React, { Component } from "react";
import {Button, Card, Form, InputGroup} from "react-bootstrap";
import Editpost from "../editpost/editpost";
import { Link } from "react-router-dom";
import './blogposts.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const URL = "http://localhost:8080/posts";
const DELETE_URL = "http://localhost:8080/posts/";

class Blogposts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogposts: [],
      editid: "",
      edittitle: "",
      editcontent: "",
      filteredBlogposts: [],
      filter: ""
    };
    this.delete = this.delete.bind(this);
    this.search = this.search.bind(this);
    //this.editPost = this.editPost.bind(this);
  }

  componentDidMount() {
    fetch(URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => this.setState({ blogposts: data, filteredBlogposts: data}));
  }

  delete(id) {
    fetch(DELETE_URL + id, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    }).then(() => console.log("Deleted blogpost id = " + id)).then(() =>
    fetch(URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => this.setState({ blogposts: data}))
        .then(() => this.search(this.state.filter)));
  }

  search(e) {
    let filtered = [];

    filtered = this.state.blogposts.filter((blogpost) => {
      if (e !== this.state.filter) {
        return blogpost.title.toLowerCase().includes(e.target.value.toLowerCase());
      } else {
        return blogpost.title.toLowerCase().includes(this.state.filter);
      }
    });

    if (e !== this.state.filter) {
      this.setState({filteredBlogposts: filtered, filter: e.target.value.toLowerCase()});
    } else {
      this.setState({filteredBlogposts: filtered});
    }
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xl={7} xs={12}>
            <InputGroup id="searchInputGroup">
              <Form.Control type="text" placeholder="Search..." onChange={this.search}/>
            </InputGroup>
          </Col>
        </Row>
      <div className="card text-center" id="bg-content">
        {this.state.filteredBlogposts.map( post =>
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
      </Container>
    );
  }
}

export default Blogposts;
