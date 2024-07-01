import React,{createContext, useState} from 'react';
import { useEffect } from 'react';
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [isAuth,setIsAuth] = useState(false);
  // const [user,setUser] = useState(null);

  const login = (userData) => {
    localStorage.setItem('User',JSON.stringify(userData));
    setIsAuth(true);
    localStorage.setItem('auth',isAuth);
  }
  
  const logout = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('auth');
    setIsAuth(false);
  }

  return ( 
    <>
      <AuthContext.Provider value={{isAuth,login,logout}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider;