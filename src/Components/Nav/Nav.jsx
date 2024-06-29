import {Link,useNavigate} from 'react-router-dom'
import './Nav.scss'
import { useAuth } from '../Auth'

const Nav = () => {
  const {isAuth,logout} = useAuth();
  const navigate=useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/register')
  }
  return (
   <nav className="navbar">
    <h1>Landing page</h1>
    <div className="links">
        {isAuth ? 
          (<> <Link to='/' >Home</Link> <button onClick={handleLogout}>Logout</button></>) :
          (<> <Link to='/register'>Sign up</Link> </>)
        }
    </div>
   </nav>
  )
}

export default Nav