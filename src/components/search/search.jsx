import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from "react-bootstrap/InputGroup";
import {Card} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import Editpost from "../editpost/editpost";
import Blogposts from "../blogposts/blogposts";

const URL = "http://localhost:8080/posts";
const DELETE_URL = "http://localhost:8080/posts/";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {filter: "", blogposts: []};

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.delete = this.delete.bind(this);
    this.editPost = this.editPost.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.renderMain = this.renderMain.bind(this);
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
    fetch(DELETE_URL + id, {
      method: 'DELETE',//
      headers: {'Content-Type': 'application/json'},
    }).then(() => console.log("Deleted blogpost id = " + id)).then(() =>
        fetch(URL, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then(data => this.setState({ blogposts: data })).then(() => this.renderSearch()))
  }

  editPost(id, title, content) {
    console.log(id, title, content)

    ReactDOM.render(
        <Editpost id={id} title={title} content={content}/>
        , document.getElementById("content"))
  };

  handleChange = event => {
    event.preventDefault();

    this.setState({filter: event.target.value.toLowerCase()})
  }

  search() {
    fetch(URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
        .then(response => response.json())
        .then(data => this.setState({ blogposts: data })).then(() => this.renderSearch())
  }

  renderSearch() {
    let content = [];

    {
      this.state.blogposts.map(post => {
        if (post.title.toLowerCase().includes(this.state.filter)) {
          content.push(
              <Card border="dark" style={{width: '60%', margin: '0 auto', marginTop: "25px"}}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.content}
                  </Card.Text>
                  <Button className="btn float-left" id={post.id}
                          onClick={(e) => this.editPost(e.target.id, post.title, post.content)}
                          variant="secondary">Edit</Button>
                  <Button className="btn btn-primary float-right" id={post.id}
                          onClick={(e) => this.delete(e.target.id)}>Delete</Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Posted at {post.date}</small>
                </Card.Footer>
              </Card>)
        }
      })
    }

    if (content.length > 0) {
      content.push(
          <Card border="dark" style={{ width: '60%', margin: '0 auto', marginTop: "25px" }}>
            <Button className="btn btn-primary" id="backToMain" onClick={this.renderMain}>Back to all blogs</Button>
          </Card>
      )
    }

    if (content.length < 1) {
      content.push(
          <Card border="dark" style={{ width: '60%', margin: '0 auto', marginTop: "25px" }}>
            <Card.Body>
              <Card.Title>No Blogposts with that title</Card.Title>
              <Card.Text>
                Try another one!
              </Card.Text>
            </Card.Body>
            <Button className="btn btn-primary" id="backToMain" onClick={this.renderMain}>Back to all blogs</Button>
          </Card>
      )
    }

    ReactDOM.render(<div className="card text-center">{content}</div>, document.getElementById("content"))
  }

  renderMain() {
    ReactDOM.render(
        <Blogposts/>
        , document.getElementById("content"))
  }

  render() {
    return (
      <div>
        <InputGroup>
          <FormControl onChange={this.handleChange} placeholder="Search..." />
            <InputGroup.Append>
              <Button onClick={this.search}>Search</Button>
            </InputGroup.Append>
         </InputGroup>
      </div>
    )
  }
}

export default Search;
