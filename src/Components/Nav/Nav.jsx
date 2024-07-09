import {Link,useNavigate} from 'react-router-dom'
import './Nav.scss'
import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';
import { Themes } from '../../../Theme/Theme';
import { ThemeContext } from '../../Context/ThemeContext';
import Logout from '../../assets/logout.png';

const Nav = () => {
  const {logout,user} = useContext(AuthContext);
  const navigate=useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/register')
  }

  const {handleTheme} = useContext(ThemeContext); //to set theme from dropdown to state variable
  const handleSelectChange = (event) => {
    const selectedThemes = event.target.value;
    const colorsArray = selectedThemes.split(',').map(color => color.trim()); //to convert into array
    handleTheme(colorsArray)
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
        <select defaultValue={Themes[0].name} onChange={(color)=>{handleSelectChange(color)}} >
          {Themes.map((theme)=>(
            <option key={theme.name} value={theme.colors}>{theme.name}</option>
          ) )}
        </select>
    </div>
   </nav>
  )
}

export default Nav