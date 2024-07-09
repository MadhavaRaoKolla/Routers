import React, { useContext, useEffect } from 'react'
import { useRoutes,Navigate } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Error from '../Pages/Error/Error'
import Form from './Form/Form'
import Profile from '../Pages/Profile/Profile'
import { AuthContext } from '../Context/Auth'

const Approutes = () => {
    const {user,loading} = useContext(AuthContext); 
    // const user = JSON.parse(localStorage.getItem('user'));
    const routes = useRoutes([
        {path:'/',element: user ? <Home/> : <Navigate to="/register"/>},
        {path:'/form',element:user ? <Form/> : <Navigate to="/register"/>},
        {path:'/profile',element:user ? <Profile/> : <Navigate to='/register'/>}, 
        {path:'/register', element: !user ? <Register/> : <Navigate to="/"/>},
        {path:'/login',element:!user ? <Login/> : <Navigate to="/"/>},
        {path:'*',element:<Error/>}
    ])
    
    if(loading){
        return <div>Loading...</div>
    }
   
  return (
    <>
        {routes}
    </>
)
}

export default Approutes