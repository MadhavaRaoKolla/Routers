import React, { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user: auth0user, logout: auth0logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  //after refreshing infinite loop
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated && auth0user) {
          const users =await (await fetch("http://localhost:7000/data")).json();
          const userDB = users.find( user => user.email === auth0user.email);
          console.log("users",users);
          console.log("user db",userDB);
          if(userDB){
            const {password,confirmpassword,...info} = userDB;
            setUser(info);
            localStorage.setItem("user",JSON.stringify(info));
          }
          else{
            navigate('/register');
            alert("User does not exist in DB, Please register")
          }
        }
      } catch (err) {
        console.log("error",err)
      }
    };
    fetchUserData();
  }, [isAuthenticated,auth0user]);
  
  const login = (userData) => {
    const { password, confirmpassword, ...info } = userData;
    setUser(info);
    localStorage.setItem("user", JSON.stringify(info));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    auth0logout({ returnTo: window.location.origin });
  };

  return (
    <>
      <AuthContext.Provider value={{ login, user, logout, loading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
