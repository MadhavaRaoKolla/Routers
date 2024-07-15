import React, { useState, useContext } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Auth';
import bcrypt from 'bcryptjs';
import {Button,Formgroup,Signup,StyleLink,Title} from '../../Components/StyledComponents/LoginSignup'

const Register = () => {
  const [userdata, setUserData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    dob: '',
    gender: '',
    email: '',
    role:'',
    password: '',
    confirmpassword: ''
  });

  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userdata, [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let errors = {};
    if (!userdata.firstname) errors.firstname = 'First Name is required';
    if (!userdata.lastname) errors.lastname = 'Last Name is required';
    if (!userdata.username) errors.username = 'Username is required';
    if (!userdata.dob) errors.dob = 'Date of birth is required';
    if (!userdata.gender) errors.gender = 'Gender is required';
    if (!userdata.email) errors.email = 'Email is required';
    if (!userdata.role) errors.role="Role is Required";
    if (!userdata.password) errors.password = 'Password is required';
    if (!userdata.confirmpassword) errors.confirmpassword = 'Confirm Password is required';
    if (userdata.password !== userdata.confirmpassword) errors.confirmpassword = 'Passwords do not match';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await fetch('http://localhost:7000/data');
      const users = await response.json();
      let userExists = false;
      for (let i=0; i<users.length; i++) {
        if (users[i].email === userdata.email) {
          userExists = true;
          break;
        }
      }
      if (userExists) {
        alert('User already exists. Please try with a new email.');
        setUserData({
          firstname: '',
          lastname: '',
          username: '',
          dob: '',
          gender: '',
          email: '',
          role:'',
          password: '',
          confirmpassword: ''
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(userdata.password,10);
      const newUserData = {...userdata,password:hashedPassword,confirmpassword:hashedPassword}

      const newData = await fetch('http://localhost:7000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData)
      });
      const newUser = await newData.json(); 
      login(newUser);
      setUserData({
        firstname: '',
        lastname: '',
        username: '',
        dob: '',
        gender: '',
        email: '',
        role:'',
        password: '',
        confirmpassword: ''
      });
      navigate('/');
    } catch (err) {
      console.log("Error is:", err);
    }
  };

  return (
    <Signup className='signup'> 
      <form className="signup-form" onSubmit={handleSubmit}>
        <Title>Sign Up</Title>

        <Formgroup className="form-group">
          <label>First Name:</label>
          <input type="text" name='firstname' value={userdata.firstname} onChange={handleChange} 
            className={errors.firstname ? 'error' : ''}
            placeholder={errors.firstname ? errors.firstname : ''}
          />
        </Formgroup>

        <Formgroup className='form-group'>
          <label>Last Name:</label>
          <input type="text" name='lastname' value={userdata.lastname} onChange={handleChange}  
            className={errors.lastname ? 'error' : ''}
            placeholder={errors.lastname ? errors.lastname : ''}
          />
        </Formgroup>

        <Formgroup className='form-group'>
          <label>Username:</label>
          <input type="text" name='username' value={userdata.username} onChange={handleChange}  
            className={errors.username ? 'error' : ''}
            placeholder={errors.username ? errors.username : ''}
          />
        </Formgroup>

        <Formgroup className='form-group'>
          <label>Date of birth:</label>
          <input type="date" name="dob" value={userdata.dob} onChange={handleChange}  
            className={errors.dob ? 'error' : ''}
            placeholder={errors.dob ? errors.dob : ''}
          />
        </Formgroup>

        <Formgroup className='form-group'>
          <label>Gender</label>
          <div className="genders">
            <label className={errors.gender ? 'radio' : ''}>
              <input type="radio" name="gender" value="Male" checked={userdata.gender === 'Male'} onChange={handleChange}  />Male
            </label>
            <label className={errors.gender ? 'radio' : ''}>
              <input type="radio" name="gender" value="Female" checked={userdata.gender === 'Female'} onChange={handleChange}  />Female
            </label>
          </div>
        </Formgroup>

        <Formgroup className='form-group'>
          <label>Email:</label>
          <input type="email" name="email" value={userdata.email} onChange={handleChange}  
            className={errors.email ? 'error' : ''}
            placeholder={errors.email ? errors.email : ''}
          />
        </Formgroup>
       
        <Formgroup className='form-group'>
          <label>Role:</label>
          <select name="role" value={userdata.role} onChange={handleChange} 
            className={errors.role ? 'error' : ''} placeholder={errors.role ? errors.role : ''}>
            <option value="">{errors.role ? errors.role : '--select--'}</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </Formgroup>

        <Formgroup className='form-group'>
          <label>Password:</label>
          <input type="password" name="password" value={userdata.password} onChange={handleChange}  
            className={errors.password ? 'error' : ''}
            placeholder={errors.password ? errors.password : ''}
          />
        </Formgroup>
       
        <Formgroup className='form-group'>
          <label>Confirm Password:</label>
          <input type="password" name="confirmpassword" value={userdata.confirmpassword} onChange={handleChange}  
            className={errors.confirmpassword ? 'error' : ''}
            placeholder={errors.confirmpassword ? errors.confirmpassword : ''}
          />
        </Formgroup>

        <div className="button">
          <Button>Submit</Button>
        </div>
      </form>
      <StyleLink to='/login'>Existing User</StyleLink>
    </Signup>
  );
};

export default Register;
