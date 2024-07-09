import React,{createContext, useState,useEffect} from 'react';
import { Themes } from '../../Theme/Theme';

export const ThemeContext = createContext()

const ThemeProvider = ({children}) => {

const [theme,setTheme] = useState(Themes[0].colors) //theme will be array of colors
const handleTheme = (colors) => { setTheme(colors) }
  
useEffect(() => {
    const root = document.documentElement;
    theme.forEach((color, index) => {
      root.style.setProperty(`--color-${index}`, color);
    });
  }, [theme]);

  return ( 
    <>
      <ThemeContext.Provider value={{theme,handleTheme}}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}

export default ThemeProvider;