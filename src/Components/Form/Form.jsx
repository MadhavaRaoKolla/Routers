import React, { useContext, useEffect, useState } from 'react';
import './Form.scss';
import Item from '../Item/Item';
import { AuthContext } from '../../Context/Auth';

const Form = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    about: ''
  });

  //fetching data to display in the same page
  useEffect(() => {
    if (user) {
      const id = user.id;
      fetch(`http://localhost:3000/data?user_id=${id}`)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const id = user.id;
    try {
      const response = await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: id })
      });

      if (!response.ok) throw new Error("Updating failed...");
      const newData = await response.json();
      setData([...data, newData]); //setting new object into array of objects to display
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        gender: '',
        about: ''
      });
    } catch (err) {
      console.log("Error:", err);
    }
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/data/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) throw new Error("Deleting Failed");
        setData(data.filter(user => user.id !== id));
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='student'>
      <form className='data' onSubmit={handleSubmit}>
        <p>Student details form:</p>
        <label>First Name</label>
        <input type="text" name='firstname' value={formData.firstname} onChange={handleChange} />
        <label>Last Name</label>
        <input type="text" name='lastname' value={formData.lastname} onChange={handleChange} />
        <label>Email</label>
        <input type="email" name='email' value={formData.email} onChange={handleChange} />
        <label>Gender</label>
        <div>
          <input type="radio" name='gender' value='Male' checked={formData.gender === 'Male'} onChange={handleChange} />Male
        </div>
        <div>
          <input type="radio" name='gender' value='Female' checked={formData.gender === 'Female'} onChange={handleChange} />Female
        </div>
        <label>About</label>
        <textarea name="about" value={formData.about} onChange={handleChange} required></textarea>
        <input type="submit" />
      </form>
      <div className="item">
        {data && <Item data={data} handleDelete={handleDelete} />}
      </div>
    </div>
  )
}

export default Form;
