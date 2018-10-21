import React, { Component } from 'react';
import './App.css';
import Jumbotron from './Components/Jumbotron/Jumbotron'
import Article from './Components/Article/Article'

class App extends Component {
  render() {
    return (
      <div>
        <Jumbotron />
        <Article />
      </div>      
    );
  }
}

export default App;
