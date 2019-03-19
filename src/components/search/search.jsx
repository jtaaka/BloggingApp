import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from "react-bootstrap/InputGroup";

const URL = "http://localhost:8080/posts";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {filter: ""};

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({filter: event.target.value.toLowerCase()})
  }

  search = async (event) => {
    event.preventDefault();

    console.log(this.state.filter)

    const call = await fetch(URL);
    const data = await call.json();

    if (call.ok) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase().includes(this.state.filter)) {
            console.log(data[i])
        }
      }
    }
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
