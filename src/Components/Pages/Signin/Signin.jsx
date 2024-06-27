import React, { useState } from 'react';
import './Signin.scss';
import { Link
  
 } from 'react-router-dom';
const Signin = () => {
  const [data, setData] = useState({
    firstname: '',
    password: ''
  });

  const handleChange = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>UserName :</label>
        <input type="text" name='firstname' value={data.firstname} onChange={handleChange} required/>
        <label>Password :</label>
        <input type="password" name='password' value={data.password} onChange={handleChange} required/>
        <div className='button'>
          <button className="submit">Submit</button>
        </div>
      </form>
    <Link to="/signup">Don't have an account! Lets Signup</Link>
    </div>
  );
}

export default Signin;
