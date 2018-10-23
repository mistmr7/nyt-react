import React from 'react'
import './Jumbotron.css'


const Jumbotron = (props) => {
  
  return (
    <div className="jumbotron text-center">
      <h1>NY Times React Mongo Scraper</h1>
      <p>A full-stack application</p>
      <button className="btn btn-primary scrape-btn" onClick={props.click}>Scrape</button>
      <button className="btn btn-danger clear-btn" onClick={props.click}>Clear</button>
    </div>
  )
}

export default Jumbotron;