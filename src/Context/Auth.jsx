import React,{createContext, useState,useEffect} from 'react';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null); 
  const [loading,setLoading] = useState(true);

  useEffect( ()=>{
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
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
      <AuthContext.Provider value={{login,user,logout,loading}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider;