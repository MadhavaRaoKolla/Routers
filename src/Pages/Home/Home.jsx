import React from 'react'
import './Home.scss'

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  
  return (
  <div className='home'>
    <p>Welcome to home page 😇</p>
    Hi {user && user.firstname} 🤝
    <p>Hope you are doing well..!🙌 </p>
  </div>
)
}

export default Home