import {Link,useNavigate} from 'react-router-dom'
import './Nav.scss'
import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';

const Nav = () => {
  const {logout} = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate=useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/register')
  }
  return (
   <nav className="navbar">
    <h1>Routes</h1>
    <div className="links">
        {user ? 
          ( <> 
              <Link to='/' >Home</Link>
              <Link to='/form'>Form</Link>
              <Link to='/profile'>Profile</Link>
              <button onClick={handleLogout}>Logout</button></> ) :
          (<> <Link to='/register'>Sign up</Link> </>)
        }
    </div>
   </nav>
  )
}

export default Nav