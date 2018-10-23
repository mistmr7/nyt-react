import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Articles from './pages/Articles';



class App extends Component {
  
  
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Articles} />
          </Switch>
        </div>
      </Router>
            
    );
  }
}

export default App;
