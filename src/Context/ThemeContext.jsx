import React, { createContext, useState, useEffect } from "react";
import { Themes } from "../Theme/Theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Themes.Orange);
  const handleTheme = (newTheme) => {
    setTheme(Themes[newTheme]);
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, handleTheme }}>
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default ThemeProvider;
