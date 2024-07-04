import React from 'react'
import { useRoutes,Navigate } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Error from '../Pages/Error/Error'
import Form from './Form/Form'
import Profile from '../Pages/Profile/Profile'

const Approutes = () => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    const routes = useRoutes([
        {path:'/',element: user ? <Home/> : <Navigate to="/register"/>},
        {path:'/form',element:user ? <Form/> : <Navigate to="/register"/>},
        {path:'/profile',element:user ? <Profile/> : <Navigate to='/register'/>}, 
        {path:'/register', element: <Register/> },
        {path:'/login',element:<Login/>},
        {path:'*',element:<Error/>}
    ])

  return (
    <>
        {routes}
    </>
)
}

export default Approutes