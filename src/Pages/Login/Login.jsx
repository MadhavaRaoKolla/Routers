import React, { useState, useContext } from "react";
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
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../Components/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ email: "", password: "" });
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

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
      //check if user not exists with email and password
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("email", "==", data.email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setData({ email: "", password: "" });
        alert("User does not exist, please register");
        navigate("/register");
        return;
      }

      //sign in with email and password
      const authUser = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const docRef = doc(db, "Users", authUser.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // linkAccounts();
        login(docSnap.data());
        setData({ email: "", password: "" });
      }

      // await auth.onAuthStateChanged(async (user) => {
      //   const docRef = doc(db, "Users", user.uid);
      //   const docSnap = await getDoc(docRef);
      //   if (docSnap.exists()) {
      //     login(docSnap.data());
      //     setData({ email: "", password: "" });
      //     navigate("/");
      //   } else {
      //     setData({ email: "", password: "" });
      //     alert("User is not registered");
      //     navigate("/register");
      //   }
      // });
      
    } catch (err) {
      console.log("error is...",err.message);
    }
  };

  const googleLogin = async () => {
    //add check user already exists in db no need to sign in with google
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const googleUser = auth.currentUser;
    //check if already exists
    const docRef = doc(db, "Users", googleUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) login(docSnap.data());
    else {
      await setDoc(doc(db, "Users", googleUser.uid), {
        email: googleUser.email,
        firstname: googleUser.displayName,
        lastname: googleUser.displayName,
        username: googleUser.displayName,
        gender: "Male",
        role: "User",
        dob: "1947-05-15",
      });
      login({
        email: googleUser.email,
        firstname: googleUser.displayName,
        lastname: googleUser.displayName,
        username: googleUser.displayName,
        gender: "Male",
        role: "User",
        dob: "1947-05-15",
      });
    }
    // await auth.currentUser.linkWithPopup(provider)
    // linkWithPopup(auth.currentUser, provider)
    //   .then((result) => {
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     console.log("credential...", credential);
    //     const user = result.user;
    //     console.log("user...", user);
    //   })
    //   .catch((err) => console.log("error", err));

  };

  const linkAccounts = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        data.email,
        data.password
      );
      await linkWithCredential(auth.currentUser, credential);
      console.log("accounts linked");
    } catch (error) {
      console.log("Linking faield...", error);
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
          googleLogin();
        }}
      >
        Sign in with Google
      </button>
    </Loginbox>
  );
};

export default Login;
