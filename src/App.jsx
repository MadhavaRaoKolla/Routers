import React from "react";
import "./App.scss";
import Approutes from "./Components/Approutes";
import AuthProvider from "./Context/Auth";
import ThemeProvider from "./Context/ThemeContext";
import GlobalStyles from "./Components/StyledComponents/Globalstyle";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <GlobalStyles />
        <Approutes />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
