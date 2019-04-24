import React, { Component } from "react";
import {Button, Card, Form, InputGroup} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import './blogposts.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";
import Comment from '../comment/comment';

const URL = "http://localhost:8080/posts";
const DELETE_URL = "http://localhost:8080/posts/";

class Blogpostsanyuser extends Component {
  constructor(props) {
    super(props);


    this.state = {
      blogposts: [],
      filteredBlogposts: [],
      filter: ""
    };

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    fetch(URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => this.setState({ blogposts: data, filteredBlogposts: data}));
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
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Posted at {post.date}</small>
            </Card.Footer>
            <Comment id={post.id}/>
          </Card>)}
      </div>
      </Container>
    );
  }
}

export default withRouter(Blogpostsanyuser);
