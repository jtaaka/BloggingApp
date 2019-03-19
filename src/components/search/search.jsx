import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from "react-bootstrap/InputGroup";

const URL = "http:////localhost:8080/posts";

class Search extends Component {
  state = {filter: ""};

  constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.initSearch = this.initSearch.bind(this);
      this.search = this.search.bind(this);
  }

  handleChange(e) {
    this.setState({filter: e.target.value.toLowerCase()})
  }

  search = async (event) => {
      event.preventDefault();

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

  initSearch() {
    if (this.state.filter !== "") {
        return this.search
    }
  }

  render() {
    return (
      <div>
         <InputGroup>
             <FormControl onChange={this.handleChange} placeholder="Search..."/>
             <InputGroup.Append>
                 <Button onClick={this.initSearch}>Search</Button>
             </InputGroup.Append>
         </InputGroup>
      </div>
    )
  }
}

export default Search;
