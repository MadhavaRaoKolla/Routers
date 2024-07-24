import React, { useContext, useEffect, useState } from "react";
import "./Form.scss";
import Item from "../Item/Item";
import { AuthContext } from "../../Context/Auth";
import { Data, Label, P } from "../StyledComponents/FormComp";
import { db, auth } from "../firebase";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";

const Form = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState(""); //input field
  const [filter, setFilter] = useState(""); //dropdown
  const [sort, setSort] = useState(""); //sorting

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    about: "",
  });

  //fetching data to display in the same page
  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const querySnapshot = await getDocs(collection(db, "Forms"));
        const formsData = [];
        querySnapshot.forEach((doc) => {
          formsData.push({ ...doc.data(), id: doc.id });
        });
        if (user.role === "User") {
          setData(
            formsData.filter((item) => {
              return item.uid === auth.currentUser.uid;
            })
          );
        } else {
          setData(formsData);
        }
      }
    };
    if (user) {
      fetchData();
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

  const filteredData = data.filter((item) => {
    if (!filter || !search) return true;
    if (filter === "gender") return item[filter].includes(search);
    return item[filter].toLowerCase().includes(search.toLowerCase());
  });

  const sortedData = filteredData.sort((a, b) => {
    return a[sort]?.toLowerCase() > b[sort]?.toLowerCase() ? 1 : -1;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      //updates if edit id exists
      if (editId) {
        await setDoc(doc(db, "Forms", editId), {
          ...formData,
          uid: auth.currentUser.uid,
        });
      } else {
        //adds new item
        await addDoc(collection(db, "Forms"), {
          ...formData,
          uid: auth.currentUser.uid,
        });
      }
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        about: "",
      });
      setEditId(null);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Forms", id));
      setData(data.filter((user) => user.id !== id));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="form">
      <div className="dropdown">
        <Label>Filter :</Label>
        <select
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="">--filter by--</option>
          <option value="firstname">First Name</option>
          <option value="lastname">Last Name</option>
          <option value="email">Email</option>
          <option value="gender">Gender</option>
        </select>
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="dropdown">
        <Label>Sort :</Label>
        <select
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="">--Sort by--</option>
          <option value="firstname">First Name</option>
          <option value="lastname">Last Name</option>
          <option value="email">Email</option>
          <option value="gender">Gender</option>
        </select>
      </div>

      <div className="student">
        <Data onSubmit={handleSubmit} className="data">
          <P>Student details form:</P>
          <Label>First Name</Label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          <Label>Last Name</Label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
          <Label>Email</Label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Label>Gender</Label>
          <Label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </Label>
          <Label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </Label>
          <Label>About</Label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            required
          ></textarea>
          <input type="submit" value={editId ? "Update" : "Submit"} />
        </Data>
        <div className="item">
          {data && (
            <Item
              data={sortedData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
