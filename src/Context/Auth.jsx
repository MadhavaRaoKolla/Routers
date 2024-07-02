import React,{createContext, useState} from 'react';
import { useEffect } from 'react';
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [isAuth,setIsAuth] = useState(false);
  const [user,setUser] = useState(null);

  useEffect( ()=>{
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('auth');
    if(storedUser && storedAuth){
      setUser(JSON.parse(storedUser));
      setIsAuth(JSON.parse(storedAuth));
    }
  },[])
  
  useEffect( ()=> {
    localStorage.setItem('auth',isAuth);
  },[isAuth])

  const login = (userData) => {
    setUser(userData);
    setIsAuth(true); //if its value is false how do i not get access to home page from signup
    localStorage.setItem('user',JSON.stringify(userData));
    // localStorage.setItem('auth',JSON.stringify(isAuth));
    // localStorage.setItem('auth',JSON.stringify(true)); //this is not value of auth it is hardcoded
    console.log(isAuth);
  }
  
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    setIsAuth(false);
    setUser(null);
    console.log(isAuth);
  }

  return ( 
    <>
      <AuthContext.Provider value={{isAuth,login,user,logout}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider;