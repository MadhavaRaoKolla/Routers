import React, { useContext } from 'react'
import { AuthContext } from '../../Context/Auth'
import styled from 'styled-components'

const Home = () => {
  // const user = JSON.parse(localStorage.getItem('user'))
  const {user} = useContext(AuthContext)
  return (
    <HomeDiv className='home'>
      Hi {user && user.firstname} 🤝
      <p>Welcome to home page 😇</p>
      <p>Hope you are doing well..!🙌 </p>
    </HomeDiv>
  )
}

const HomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Noto Sans;
    margin: 1rem;
    font-size: 2rem;
    color: var(--color-7);
  @media(max-width: 650px) {
    font-size: 1.5rem;
  }
  @media(max-width: 400px) {
    font-size: 1rem;
  }
`;

export default Home