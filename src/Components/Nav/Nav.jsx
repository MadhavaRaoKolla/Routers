import {Link,useNavigate} from 'react-router-dom'
import './Nav.scss'
import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';
import Logout from '../../assets/logout.png';
import CustomDropdown from '../Dropdown/Dropdown';

const Nav = () => {
  const {logout,user} = useContext(AuthContext);
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
              <button onClick={handleLogout}>
                <img src={Logout} alt="Logout" />
              </button></> ) :
          (<> <Link to='/register'>Sign up</Link> </>)
        }
        <CustomDropdown/>
    </div>
   </nav>
  )
}

export default Nav