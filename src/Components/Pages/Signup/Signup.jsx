import React from 'react';
import './Signup.scss';
import { useState } from 'react';
import { Link

 } from 'react-router-dom';
const Signup = () => {

  const [userdata, setUserData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const handleChange = (e) => {
    setUserData({
      ...userdata, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userdata.password !== userdata.confirmpassword) {
      alert("Passwords do not match...!");
      return;
    }
    try {
      const response = await fetch('http://localhost:7000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
      });
      const res = await response.json();
      console.log(res);
      setUserData({
        firstname: '',
        lastname: '',
        username: '',
        dob: '',
        gender: '',
        email: '',
        password: '',
        confirmpassword: ''
      })
    }
    catch (err) {
      console.log("Error is:", err);
    }
  }

  return (
    <div className="signup">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name='firstname' value={userdata.firstname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name='lastname' value={userdata.lastname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name='username' value={userdata.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Date of birth:</label>
          <input type="date" name="dob" value={userdata.dob} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div className="genders">
            <label>
              <input type="radio" name="gender" value="Male" checked={userdata.gender==='Male'} onChange={handleChange} required />Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" checked={userdata.gender==='Female'} onChange={handleChange} required />Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={userdata.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={userdata.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" name="confirmpassword" value={userdata.confirmpassword} onChange={handleChange} required />
        </div>
        <div className="button">
          <button className="submit">Submit</button>
        </div>
      </form>
      <Link to="/signin">Existing User !</Link>
    </div>
  )
}

export default Signup;
