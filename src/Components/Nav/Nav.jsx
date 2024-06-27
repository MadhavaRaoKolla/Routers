import {Link} from 'react-router-dom'
import './Nav.scss'

const Nav = () => {
  return (
   <nav className="navbar">
    <h1>Landing page</h1>
    <div className="links">
        <Link to="/">Home</Link>
        <Link to="/signin">Login</Link>
        <Link to="/signup">Sign up</Link>
    </div>
   </nav>
  )
}

export default Nav