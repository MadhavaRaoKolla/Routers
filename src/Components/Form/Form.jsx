import React, { useContext, useEffect, useState } from "react";
import "./Form.scss";
import Item from "../Item/Item";
import { AuthContext } from "../../Context/Auth";
import { Data, Label, P } from "../StyledComponents/FormComp";

const Form = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    about: "",
  });

  const [editId, setEditId] = useState(null);

  //fetching data to display in the same page
  useEffect(() => {
    if (user) {
      const url =
        user.role === "User"
          ? `http://localhost:3000/data?user_id=${user.id}`
          : "http://localhost:3000/data";
      fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const id = user.id;
    try {
      const url = `http://localhost:3000/data${editId ? `/${editId}` : ""}`;
      const response = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, user_id: id }),
      });

      if (!response.ok)
        throw new Error(editId ? "Updating Failed" : "Creating failed...");
      const newData = await response.json();

      if (editId) {
        const udpatedData = data.map(
          (item) => (item.id === editId ? newData : item) //replacing existing object with updated object
        );
        setData(udpatedData);
        setEditId(null);
      } else {
        setData([...data, newData]); //setting new object into array of objects to display
      }

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        about: "",
      });
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/data/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Deleting Failed");
        setData(data.filter((user) => user.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='student'>
    <Data onSubmit={handleSubmit} className='data'>
      <P>Student details form:</P>
      <Label>First Name</Label>
        <input type="text" name='firstname' value={formData.firstname} onChange={handleChange} />
      <Label>Last Name</Label>
        <input type="text" name='lastname' value={formData.lastname} onChange={handleChange} />
      <Label>Email</Label>
        <input type="email" name='email' value={formData.email} onChange={handleChange} />
      <Label>Gender</Label>
      <Label>
        <input type="radio" name='gender' value='Male' checked={formData.gender === 'Male'} onChange={handleChange} />Male
      </Label>
      <Label>
        <input type="radio" name='gender' value='Female' checked={formData.gender === 'Female'} onChange={handleChange} />Female
      </Label>
      <Label>About</Label>
        <textarea name="about" value={formData.about} onChange={handleChange} required></textarea>
        <input type="submit" value={editId ? 'Update' : 'Submit'}/>
      </Data>
    <div className="item">
      {data && <Item data={data} handleDelete={handleDelete} handleEdit={handleEdit}/>}
    </div>
    </div>
  );
};

export default Form;
