import React, { Component } from 'react'
import './Article.css'
import Container from '../Container/Container'

class Article extends Component {

  render() {
    return (
      <div className="container">
        <Container className="scraped"/>
        <Container className="saved"/>
      </div>      
    )
  }
  }

export default Article;