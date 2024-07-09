import React from 'react';
import './App.scss'
import Nav from './Components/Nav/Nav';
import Approutes from './Components/Approutes';
import  AuthProvider  from './Context/Auth';
import ThemeProvider from './Context/ThemeContext';

const App = () => {
  return (
    <AuthProvider>
    <ThemeProvider>
    {/* <Router> */}
      <div className="app">
        <Nav />
        <div className="content">
          <Approutes/>
        </div>
      </div>
      {/* </Router> */}
      </ThemeProvider>
      </AuthProvider>
  );
}

export default App;
