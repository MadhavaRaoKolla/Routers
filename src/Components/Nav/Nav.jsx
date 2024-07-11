import {useNavigate} from 'react-router-dom'
import './Nav.scss'
import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';
import Logout from '../../assets/logout.png';
import CustomDropdown from '../Dropdown/Dropdown';
import { Navbar,Button, Image, StyledLink, Title} from '../StyledComponents/Navbar';

const Nav = () => {
  const {logout,user} = useContext(AuthContext);
  const navigate=useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/register')
  }

  return (
   <Navbar className='navbar'>
    <Title>Inputform</Title> 
    <div className="links">
        {user ? 
          ( <> 
              <StyledLink to='/' >Home</StyledLink>
              <StyledLink to='/form'>Form</StyledLink>
              <StyledLink to='/profile'>Profile</StyledLink>
              <Button className='button' onClick={handleLogout}>
                <Image src={Logout} alt='Logout'/>
              </Button>
            </> ) :
          (<> <StyledLink to='/register'>Sign up</StyledLink> </>)
        }
        <CustomDropdown/>
    </div>
    </Navbar>
  )
}

export default Nav