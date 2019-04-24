import React, { Component } from "react";
import {Button, Card, Form, InputGroup} from "react-bootstrap";
import Editpost from "../editpost/editpost";
import {Link, withRouter} from "react-router-dom";
import './blogposts.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";
import Comment from '../comment/comment';

const URL = "http://localhost:8080/posts";
const COMMENT_URL = 'http://localhost:8080/comments';
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
    }).then(() => 
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
        <Row className="justify-content-center">
          <Col xl={10} lg={10} md={10} sm={10} xs={12}>
            <h2 id ="header2">Search for blogpost</h2>
            <InputGroup id="searchInputGroup">
              <Form.Control type="text" placeholder="Search..." onChange={this.search}/>
            </InputGroup>
          </Col>
        </Row>
      
        {this.state.filteredBlogposts.map( post =>
        <Row className="justify-content-center">
          <Col xl={10} lg={10} md={10} sm={10} xs={12}>
            <Card key={post.id} border="dark">
              <Card.Body>
                <Card.Title id ="centered">{post.title}</Card.Title>
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
                    variant="primary">
                    Edit
                  </Button>
                </Link>

              <Button className="btn float-right" id={post.id} onClick={() => this.delete(post.id)} variant="danger">Delete</Button>
                
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Posted at {post.date}</small>
              </Card.Footer>
              <Comment id={post.id}/>
            </Card>
          </Col>
        </Row>)}
      </Container>
    );
  }
}

export default withRouter(Blogposts);
