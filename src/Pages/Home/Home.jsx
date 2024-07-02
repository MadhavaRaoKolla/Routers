import React from 'react'
import './Home.scss'

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  
  return (
  <div className='home'>
    Hi {user && user.firstname}
    <p>Welcome to home page</p>
  </div>
)
}

export default Home