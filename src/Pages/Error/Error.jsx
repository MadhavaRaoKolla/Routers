import React from 'react'
import { Link } from 'react-router-dom'
import './Error.scss'
import styled from 'styled-components'

const Error = () => {
  return (
    <div className="error">
        <h1 style={{color:"var(--color-7)"}}>I dont have that page!</h1>
        <StyledLink to="/">Click here</StyledLink>
    </div>
  )
}

const StyledLink = styled(Link)`
  padding: 10px;
  border-radius: 5px;
  font-size: 1.5rem;
  color: var(--color-7);
  text-decoration: none;
  &:hover{
    color: var(--color-5);
  }
`;

export default Error