import {Link,useNavigate} from 'react-router-dom'
import './Nav.scss'
import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';
import Logout from '../../assets/logout.png';
import CustomDropdown from '../Dropdown/Dropdown';
import { Navbar,Button, Image} from '../StyledComponents/Navbar';

const Nav = () => {
  const {logout,user} = useContext(AuthContext);
  const navigate=useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/register')
  }

  return (
   <Navbar className='navbar'>
    <h1>InputForm</h1>
    <div className="links">
        {user ? 
          ( <> 
              <Link to='/' >Home</Link>
              <Link to='/form'>Form</Link>
              <Link to='/profile'>Profile</Link>
              <Button onClick={handleLogout}>
                <Image src={Logout} alt='Logout'/>
              </Button>
            </> ) :
          (<> <Link to='/register'>Sign up</Link> </>)
        }
        <CustomDropdown/>
    </div>
    </Navbar>
  )
}

export default Nav