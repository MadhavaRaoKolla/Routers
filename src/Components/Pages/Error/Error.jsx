import React from 'react'
import { Link } from 'react-router-dom'
import './Error.scss'

const Error = () => {
  return (
    <div className="error">
        <h1>I dont have that page!</h1>
        <Link to="/">Click here</Link>
    </div>
  )
}

export default Error