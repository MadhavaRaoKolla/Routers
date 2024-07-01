// import React,{createContext,useContext,useState} from 'react'

// const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//     const[isAuth,setIsAuth] = useState(0);

//     const login = () => setIsAuth(true);
//     const logout = () => setIsAuth(false);

//   return (
//     <AuthContext.Provider value={{isAuth,login,logout}}>
//       {children}
//     </AuthContext.Provider>
//    )
// }

// export const useAuth = () => useContext(AuthContext)

import React,{createContext, useState} from 'react';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [isAuth,setIsAuth] = useState(false);
  const login = () => setIsAuth(true);
  const logout = () => setIsAuth(false);
  return ( 
    <>
      <AuthContext.Provider value={{isAuth,login,logout}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider;