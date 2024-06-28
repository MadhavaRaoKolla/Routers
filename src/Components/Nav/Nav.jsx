import {Link} from 'react-router-dom'
import './Nav.scss'

const Nav = () => {
  return (
   <nav className="navbar">
    <h1>Landing page</h1>
    <div className="links">
        <Link to="/">Home</Link>
        {/* <Link to="/login">Login</Link> */}
        <Link to="/register">Sign up</Link>
    </div>
   </nav>
  )
}

export default Nav