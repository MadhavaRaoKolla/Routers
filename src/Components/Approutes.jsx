import React,{useContext} from 'react'
import { useRoutes,Navigate } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Error from '../Pages/Error/Error'
import Form from './Form/Form'
import { AuthContext } from '../Context/Auth'

const Approutes = () => {
    
    const {isAuth} = useContext(AuthContext);
    const routes = useRoutes([
        {path:'/',element: isAuth ? <Home/> : <Navigate to="/register"/>},
        {path:'/form',element:isAuth ? <Form/> : <Navigate to="/register"/>},
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