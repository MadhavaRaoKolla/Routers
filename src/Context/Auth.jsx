import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../Components/firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const { password, confirmpassword, ...info } = userData;
    setUser(info);
    localStorage.setItem("user", JSON.stringify(info));
    navigate('/')
  };

  const logout =  async () => {
    localStorage.removeItem("user");
    await auth.signOut();
    setUser(null);
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
