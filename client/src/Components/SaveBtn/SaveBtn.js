import React from 'react'
import './SaveBtn.css'

const SaveBtn = props => (
  
  <button className="btn btn-danger btn-sm" {...props}>
    {props.children}
  </button>
  
)

export default SaveBtn