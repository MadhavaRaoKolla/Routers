import React, { useState, useContext, useEffect, useDebugValue } from "react";
import "./Profile.scss";
import { AuthContext } from "../../Context/Auth";
import { useNavigate } from "react-router";
import { ItemP, P } from "../../Components/StyledComponents/FormComp";
import styled from "styled-components";
import { db, auth } from "../../Components/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";

const Profile = () => {
  const { user, login, logout } = useContext(AuthContext); //local storage user
  const [updates, setUpdates] = useState({
    firstname: "",
    lastname: "",
    username: "",
    dob: "",
    email: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (user) setUpdates(user);
  }, [user]);

  const handleChange = (e) => {
    setUpdates({
      ...updates,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    //updating existing user values
    try {
      const userRef = doc(db, "Users", auth.currentUser.uid);
      await updateDoc(userRef, {
        firstname: updates.firstname,
        lastname: updates.lastname,
        username: updates.username,
        email: updates.email,
        dob: updates.dob,
      });
      login({ ...user, ...updates });
      navigate("/");
    } catch (err) {
      console.log("error is:", err);
    }
  };

  const handleDelete = async () => {
    try {
      //deleting items of users from Forms
      const querySnapshot = await getDocs(collection(db, "Forms"));
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push({ ...doc.data(), id: doc.id });
      });
      for (const item of userData) {
        if (item.uid === auth.currentUser.uid) {
          const delUser = doc(db, "Forms", item.id);
          await deleteDoc(delUser);
        }
      }

      //deleting user from Users
      const userRef = doc(db, "Users", auth.currentUser.uid);
      await deleteDoc(userRef);
      await deleteUser(auth.currentUser)
        .then(() => {
          // alert("Account Deleted successfully!");
        })
        .catch((err) => {
          console.log("Error in deleting auth", err);
        });
      localStorage.removeItem("user");
      logout();
    } catch (err) {
      console.log("error is", err);
    }
  };

  if (!user) return <div>Loading...</div>;
  return (
    <ProfileDiv className="profile">
      <P>Welcome to Your Profile</P>
      <div className="content">
        <div className="left">
          <ItemP>Hi {user.firstname}</ItemP>
          <ItemP>Here you can view your profile.</ItemP>
          <ItemP>And can edit your details also..!</ItemP>
        </div>
        <div className="right">
          <form className="forms">
            <div className="block">
              <label>Firstname: </label>
              <input
                type="text"
                name="firstname"
                value={updates.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="block">
              <label>Lastname:</label>
              <input
                type="text"
                name="lastname"
                value={updates.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="block">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={updates.username}
                onChange={handleChange}
              />
            </div>
            <div className="block">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updates.email}
                onChange={handleChange}
              />
            </div>
            <div className="block">
              <label>DOB:</label>
              <input
                type="date"
                name="dob"
                value={updates.dob}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
      <button className="update" onClick={handleSubmit}>
        Update
      </button>
      <button className="delete" onClick={handleDelete}>
        Delete Account
      </button>
    </ProfileDiv>
  );
};

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  width: 40rem;
  box-shadow: 0px 0px 2px ${({ theme }) => theme.fontColor};
  background: linear-gradient(
    100deg,
    ${({ theme }) => theme.loginSignupForm},
    ${({ theme }) => theme.profileSecondColor}
  );
  font-weight: bold;

  @media (max-width: 605px) {
    width: 30rem;
  }
  @media (max-width: 515px) {
    width: 20rem;
  }
  @media (max-width: 350px) {
    width: 15rem;
  }
`;

export default Profile;
