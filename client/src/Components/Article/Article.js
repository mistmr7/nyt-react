import React, { Component } from 'react'
import './Article.css'

class Article extends Component {

  render() {
    return (
      <div className="card">
        <ul>
          {this.props.children}
        </ul>
      </div>      
    )
  }
  }

export default Article;