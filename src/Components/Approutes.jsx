import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Error from '../Pages/Error/Error'

const Approutes = () => {
    
    const routes = useRoutes([
        {path:'/',element:<Home/>},
        {path:'/register',element:<Register/>},
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