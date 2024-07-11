import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { AuthContext } from '../../Context/Auth';
import bcrypt from 'bcryptjs';
import { Loginbox,Button,Title, Label, StyleLink } from '../../Components/StyledComponents/LoginSignup';

const Login = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!data.username) errors.username = 'Username is required';
    if (!data.password) errors.password = 'Password is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    fetch(`http://localhost:7000/data`)
      .then(res => res.json())
      .then(users => {
        let userExists = false;
        for (let i=0; i<users.length; i++) {
          // if(users[i].username === data.username && users[i].password === data.password) {
          if(users[i].username === data.username){
            const isMatch = bcrypt.compare(data.password,users[i].password)
              if(isMatch){
                userExists = true;
                setData({ username:'',password:''});
                alert("Login successful!");
                login(users[i]);
                navigate(`/`)
                break;
              }
            }
        }
        if (!userExists) {
          setData({ username: '', password: '' });
          alert("User does not exist");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Loginbox className='login'>
      <form className="form" onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Label>UserName :</Label>
        <input type="text" name='username' value={data.username} onChange={handleChange} 
         className={errors.username ? 'error' : ''} placeholder={errors.username ? errors.username : ''} />
        <Label>Password :</Label>
        <input type="password" name='password' value={data.password} onChange={handleChange} 
          className={errors.password ? 'error' : ''}placeholder={errors.password ? errors.password : ''} />
        <div className='button'>
          <Button>Submit</Button>
        </div>
      </form>
      <StyleLink to="/register">Don't have an account? Let's Signup</StyleLink>
      </Loginbox>
  );
}

export default Login;
