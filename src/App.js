import React, { Component } from 'react';
import axios from 'axios';

import './app.scss';
import { baseURL } from './config';

//cardlist component.
import CardList from './components/card-list/card-list-component';
import './components/card-list/card-list.styles.scss';

//search-field component
import Search from './components/search-field/search-field.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  //live cycle methods.
  componentDidMount() {
    axios(baseURL).then((res) => {
      const { data } = res;
      this.setState({ monsters: data });
    });
  }

  handleChange = (event) => {
      this.setState({ searchField: event.target.value })
  }

  //render method
  render() {
    const { monsters, searchField } = this.state;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Cats Relodex</h1>
        {/* search box component */}
        <Search
          placeholder="Filter Cats by Name"
          handleChange={this.handleChange}
        />

        <div className="card-list">
          <CardList monsters={filteredMonsters} />
        </div>
      </div>
    );
  }
}

export default App;
