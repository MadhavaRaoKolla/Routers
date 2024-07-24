import React, { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.scss";
import { AuthContext } from "../../Context/Auth";
import {
  Loginbox,
  Button,
  Title,
  Label,
  StyleLink,
} from "../../Components/StyledComponents/LoginSignup";
import { useAuth0 } from "@auth0/auth0-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Components/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ email: "", password: "" });
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  if (user && window.location.pathname === "/login") return <Navigate to="/" />;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!data.email) errors.email = "Email is required";
    if (!data.password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      //check if user not exists
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("email", "==", data.email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setData({ email: "", password: "" });
        alert("User does not exist, please register");
        navigate("/register");
        return;
      }

      //if user not exists let him in
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setData({ email: "", password: "" });
      auth.onAuthStateChanged(async (user) => {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          login(docSnap.data());
          setData({ email: "", password: "" });
          navigate("/");
        } else {
          setData({ email: "", password: "" });
          alert("User is not registered");
          navigate("/register");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Loginbox className="login">
      <form className="form" onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Label>Email :</Label>
        <input
          type="text"
          name="email"
          value={data.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
          placeholder={errors.email ? errors.email : ""}
        />
        <Label>Password :</Label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
          placeholder={errors.password ? errors.password : ""}
        />
        <div className="button">
          <Button>Submit</Button>
        </div>
      </form>
      <Label>
        Dont have an account?
        <StyleLink to="/register"> Let's Signup!</StyleLink>
      </Label>
      <button
        className="oauth"
        onClick={() => {
          loginWithRedirect();
        }}
      >
        Sign in with Google
      </button>
    </Loginbox>
  );
};

export default Login;
