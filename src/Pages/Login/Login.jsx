import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useAuth } from '../../Components/Auth';

const Login = () => {

  const [data, setData] = useState({username: '',password: ''});
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:7000/data`)
    .then(res => res.json())
    .then(users => {
          let userExists = false;
          for (let i = 0; i < users.length; i++) {
            if(users[i].username === data.username && users[i].password === data.password) {
              userExists = true;
              setData({ username:'',password:'' })
              console.log(users[i]);
              alert("Login successful!");
              login();
              navigate('/')
              break;
            }
          }
          if (!userExists) {
            setData({username:'',password:''})
            alert("User does not exist");
          }
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>UserName :</label>
        <input type="text" name='username' value={data.username} onChange={handleChange} required/>
        <label>Password :</label>
        <input type="password" name='password' value={data.password} onChange={handleChange} required/>
        <div className='button'>
          <button className="submit">Submit</button>
        </div>
      </form>
    <Link to="/register">Don't have an account! Lets Signup</Link>
    </div>
  );
}

export default Login;
