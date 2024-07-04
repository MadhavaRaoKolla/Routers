import React,{createContext, useState} from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null); 

  useEffect( ()=>{
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  },[])
  
  const login = (userData) => {
    const {password,confirmpassword,...info}=userData;
    setUser(info);
    localStorage.setItem('user',JSON.stringify(info));
  }
  
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return ( 
    <>
      <AuthContext.Provider value={{login,user,logout}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider;