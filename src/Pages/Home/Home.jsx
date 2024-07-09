import React, { useContext } from 'react'
import './Home.scss'
import { AuthContext } from '../../Context/Auth'

const Home = () => {
  // const user = JSON.parse(localStorage.getItem('user'))
  const {user} = useContext(AuthContext)
  return (
  <div className='home'>
    Hi {user && user.firstname} 🤝
    <p>Welcome to home page 😇</p>
    <p>Hope you are doing well..!🙌 </p>
  </div>
)
}

export default Home