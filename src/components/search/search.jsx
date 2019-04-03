import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from "react-bootstrap/InputGroup";
import {Card} from "react-bootstrap";
import * as ReactDOM from "react-dom";

const URL = "http://localhost:8080/posts";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {filter: "", blogposts: []};

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    fetch(URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
        .then(response => response.json())
        .then(data => this.setState({ blogposts: data }));
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({filter: event.target.value.toLowerCase()})
  }

  search() {
    let content = [];

    { this.state.blogposts.map( post => {
      if (post.title.toLowerCase().includes(this.state.filter)) {
        content.push(
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
        </Card>)
      }
    })
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
          </Card>
      )
    }

    ReactDOM.render(<div className="card text-center">{content}</div>, document.getElementById("content"))
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
