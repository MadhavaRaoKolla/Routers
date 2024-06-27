import React, { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

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
